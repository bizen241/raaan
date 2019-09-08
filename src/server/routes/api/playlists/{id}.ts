import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Playlist } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { hasPermission } from "../../../api/security";
import { PlaylistEntity, PlaylistTagEntity } from "../../../database/entities";
import { normalizeTags } from "../../../exercise";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistId }: PathParams = req.params;

  const playlist = await getManager().findOne(PlaylistEntity, playlistId, {
    relations: ["author"]
  });
  if (playlist === undefined) {
    return next(createError(404));
  }

  const isAuthor = playlist.authorId === currentUser.id;
  if (playlist.isPrivate && !isAuthor) {
    return next(createError(403));
  }

  responseFindResult(req, res, playlist);
});

GET.apiDoc = createOperationDoc({
  entityType: "Playlist",
  summary: "Get a playlist",
  permission: "Guest",
  hasId: true
});

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistId }: PathParams = req.params;
  const params: SaveParams<Playlist> = req.body;

  await getManager().transaction(async manager => {
    const playlist = await manager.findOne(PlaylistEntity, playlistId, {
      relations: ["author", "summary", "summary.tags"]
    });
    if (playlist === undefined) {
      return next(createError(404));
    }

    if (playlist.summary === undefined || playlist.summary.tags === undefined) {
      return next(createError(500));
    }

    const isAuthor = playlist.authorId === currentUser.id;
    if (!isAuthor && !hasPermission(currentUser, "Admin")) {
      return next(createError(403));
    }

    if (isAuthor) {
      if (params.title !== undefined) {
        playlist.title = params.title;
      }
      if (params.tags !== undefined) {
        await manager.remove(playlist.summary.tags);

        const tags: PlaylistTagEntity[] = [];
        normalizeTags(params.tags).forEach(async tagName => {
          tags.push(new PlaylistTagEntity(tagName));
        });

        playlist.tags = params.tags;
        playlist.summary.tags = tags;
      }
      if (params.description !== undefined) {
        playlist.description = params.description;
      }
      if (params.isPrivate !== undefined) {
        if (!playlist.isLocked) {
          playlist.isPrivate = params.isPrivate;
        }
      }
    } else {
      if (params.isLocked !== undefined) {
        playlist.isLocked = params.isLocked;

        if (params.isLocked) {
          playlist.isPrivate = true;
        }
      }
    }

    await manager.save(playlist);

    responseFindResult(req, res, playlist);
  });
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistId }: PathParams = req.params;

  const manager = getManager();

  const playlist = await manager.findOne(PlaylistEntity, playlistId);
  if (playlist === undefined) {
    return next(createError(404));
  }

  const isAuthor = playlist.authorId === currentUser.id;
  if (!isAuthor) {
    return next(createError(403));
  }

  await manager.remove(playlist);

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Playlist",
  summary: "Delete a playlist",
  permission: "Read",
  hasId: true
});
