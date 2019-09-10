import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Playlist } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistSummaryEntity,
  PlaylistTagEntity
} from "../../database/entities";
import { normalizeTags } from "../../exercise";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const params: SaveParams<Playlist> = req.body;

  await getManager().transaction(async manager => {
    const tags: PlaylistTagEntity[] = [];
    normalizeTags(params.tags).forEach(async tag => {
      tags.push(new PlaylistTagEntity(tag));
    });

    const playlistSummary = new PlaylistSummaryEntity(tags);
    const playlist = new PlaylistEntity(currentUser, playlistSummary, params);

    await manager.save(playlist);

    if (params.exerciseId !== undefined) {
      const exercise = await manager.findOne(ExerciseEntity, params.exerciseId);
      if (exercise === undefined) {
        return next(createError(400));
      }

      const playlistItem = new PlaylistItemEntity(playlist, exercise, "");

      await manager.save(playlistItem);
    }

    responseFindResult(req, res, playlist);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Playlist",
  summary: "Create a playlist",
  permission: "Read",
  hasBody: true
});
