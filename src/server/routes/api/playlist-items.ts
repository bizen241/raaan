import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { PlaylistItem } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, PlaylistEntity, PlaylistItemEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { playlistId, exerciseId, memo = "" }: SaveParams<PlaylistItem> = req.body;
  if (playlistId === undefined || exerciseId === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const playlist = await manager.findOne(PlaylistEntity, playlistId);
    if (playlist === undefined) {
      return next(createError(400));
    }
    if (playlist.authorId !== currentUser.id) {
      return next(createError(403));
    }

    const exercise = await manager.findOne(ExerciseEntity, exerciseId);
    if (exercise === undefined) {
      return next(createError(400));
    }

    const playlistItemCount = await manager.count(PlaylistItemEntity, {
      playlist: {
        id: playlistId
      }
    });

    const playlistItem = new PlaylistItemEntity(playlist, exercise, playlistItemCount, memo);

    await manager.save(playlistItem);

    responseFindResult(req, res, playlistItem);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Create a playlist item",
  permission: "Read",
  hasBody: true
});
