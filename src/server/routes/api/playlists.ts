import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Playlist } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  getTags,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistSummaryEntity
} from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const params: Params<Playlist> = req.body;
  if (params.exerciseId === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const playlistSummary = new PlaylistSummaryEntity();
    playlistSummary.tags = await getTags(playlistSummary, params, manager);

    const playlist = new PlaylistEntity(currentUser, playlistSummary, params);
    await manager.save(playlist);

    const exercise = await manager.findOne(ExerciseEntity, params.exerciseId);
    if (exercise === undefined) {
      return next(createError(400));
    }

    const playlistItem = new PlaylistItemEntity(playlist, exercise, "");
    await manager.save(playlistItem);

    responseFindResult(req, res, playlist, playlistItem);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Playlist",
  permission: "Read",
  hasBody: true
});
