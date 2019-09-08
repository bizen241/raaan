import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { PlaylistEntity } from "../../../database/entities";

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
