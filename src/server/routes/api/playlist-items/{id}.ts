import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { PlaylistItem } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { PlaylistItemEntity } from "../../../database/entities";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistItemId }: PathParams = req.params;
  const params: Params<PlaylistItem> = req.body;

  getManager().transaction(async manager => {
    const playlistItem = await manager.findOne(PlaylistItemEntity, playlistItemId, {
      relations: ["playlist", "playlist.author", "next"]
    });
    if (playlistItem === undefined) {
      return next(createError(404));
    }
    if (playlistItem.playlist === undefined || playlistItem.next === undefined) {
      return next(createError(500));
    }

    const isAuthor = playlistItem.playlist.authorId === currentUser.id;
    if (!isAuthor) {
      return next(createError(403));
    }

    const updatedItems = [playlistItem];

    if (params.memo !== undefined) {
      playlistItem.memo = params.memo;
    }
    if (params.nextId !== undefined) {
      const nextItem = playlistItem.next;

      if (params.nextId === playlistItemId) {
        playlistItem.next = null;
      } else {
        const newNextItem = await manager.findOne(PlaylistItemEntity, params.nextId);
        if (newNextItem === undefined) {
          return next(createError(400));
        }

        playlistItem.next = newNextItem;

        const newPrevItem = await manager.findOne(PlaylistItemEntity, {
          next: {
            id: params.nextId
          }
        });

        if (newPrevItem !== undefined) {
          newPrevItem.next = playlistItem;
          updatedItems.push(newPrevItem);
        }
      }

      const prevItem = await manager.findOne(PlaylistItemEntity, {
        next: {
          id: playlistItem.id
        }
      });

      if (prevItem !== undefined) {
        prevItem.next = nextItem;
        updatedItems.push(prevItem);
      }
    }

    await manager.save(updatedItems);
    return responseFindResult(req, res, ...updatedItems);
  });
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistItemId }: PathParams = req.params;

  const manager = getManager();

  const playlistItem = await manager.findOne(PlaylistItemEntity, playlistItemId, {
    relations: ["playlist", "playlist.author", "next"]
  });
  if (playlistItem === undefined) {
    return next(createError(404));
  }
  if (playlistItem.playlist === undefined) {
    return next(createError(500));
  }

  const isAuthor = playlistItem.playlist.authorId === currentUser.id;
  if (!isAuthor) {
    return next(createError(403));
  }

  const updatedItems: PlaylistItemEntity[] = [];

  const prevItem = await manager.findOne(PlaylistItemEntity, {
    next: {
      id: playlistItemId
    }
  });
  if (prevItem !== undefined) {
    prevItem.next = playlistItem.next;

    await manager.save(prevItem);

    updatedItems.push(prevItem);
  }

  await manager.remove(playlistItem);

  responseFindResult(req, res, ...updatedItems);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Delete a playlist item",
  permission: "Read",
  hasId: true
});
