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
      relations: ["playlist", "next", "exercise"]
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

    if (params.memo !== undefined) {
      playlistItem.memo = params.memo;

      await manager.save(playlistItem);

      return responseFindResult(req, res, playlistItem);
    }

    const updatedItems: PlaylistItemEntity[] = [];

    const oldNextItem = playlistItem.next;

    playlistItem.next = null;
    await manager.save(playlistItem);

    const oldPrevItem = await manager.findOne(PlaylistItemEntity, {
      where: {
        next: {
          id: playlistItem.id
        }
      },
      relations: ["exercise"]
    });
    if (oldPrevItem !== undefined) {
      oldPrevItem.next = oldNextItem;

      updatedItems.push(oldPrevItem);
      await manager.save(oldPrevItem);
    }

    const newPrevItem = await manager.findOne(PlaylistItemEntity, {
      where: {
        next: {
          id: params.nextId
        }
      },
      relations: ["exercise"]
    });
    if (newPrevItem !== undefined) {
      newPrevItem.next = playlistItem;

      updatedItems.push(newPrevItem);
      await manager.save(newPrevItem);
    }

    if (params.nextId === undefined) {
      playlistItem.next = null;
    } else {
      const newNextItem = await manager.findOne(PlaylistItemEntity, params.nextId, {
        relations: ["exercise"]
      });
      if (newNextItem === undefined) {
        return next(createError(400));
      }

      playlistItem.next = newNextItem;
    }

    updatedItems.push(playlistItem);
    await manager.save(playlistItem);

    return responseFindResult(req, res, ...updatedItems);
  });
});

PATCH.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Update a playlist item",
  permission: "Read",
  hasBody: true
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

  const nextItem = playlistItem.next;

  const prevItem = await manager.findOne(PlaylistItemEntity, {
    where: {
      next: {
        id: playlistItemId
      }
    },
    relations: ["exercise"]
  });

  await manager.remove(playlistItem);

  if (prevItem !== undefined) {
    prevItem.next = nextItem;
    await manager.save(prevItem);

    responseFindResult(req, res, prevItem);
  } else {
    responseFindResult(req, res);
  }
});

DELETE.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Delete a playlist item",
  permission: "Read",
  hasId: true
});
