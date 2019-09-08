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

  if (playlist.isPrivate && playlist.authorId !== currentUser.id) {
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
