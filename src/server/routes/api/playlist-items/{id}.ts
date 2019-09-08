import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { PlaylistItemEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistItemId }: PathParams = req.params;

  const manager = getManager();

  const playlistItem = await manager.findOne(PlaylistItemEntity, playlistItemId, {
    relations: ["playlist", "playlist.author"]
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

  await manager.remove(playlistItem);

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Delete a playlist item",
  permission: "Read",
  hasId: true
});
