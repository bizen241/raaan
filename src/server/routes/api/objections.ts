import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Objection } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, GroupEntity, ObjectionEntity, PlaylistEntity, UserEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { targetType, targetId, description = "" }: Params<Objection> = req.body;
  if (targetType === undefined || targetId === undefined) {
    throw createError(400);
  }

  await getManager().transaction(async manager => {
    const report = new ObjectionEntity(description);

    switch (targetType) {
      case "Exercise": {
        const targetExercise = await manager.findOne(ExerciseEntity, targetId);
        if (targetExercise === undefined) {
          throw createError(400);
        }
        if (targetExercise.authorId !== currentUser.id || !targetExercise.isLocked) {
          throw createError(403);
        }

        report.targetExercise = targetExercise;

        break;
      }
      case "Group": {
        const targetGroup = await manager.findOne(GroupEntity, targetId);
        if (targetGroup === undefined) {
          throw createError(400);
        }

        report.targetGroup = targetGroup;

        break;
      }
      case "Playlist": {
        const targetPlaylist = await manager.findOne(PlaylistEntity, targetId);
        if (targetPlaylist === undefined) {
          throw createError(400);
        }
        if (targetPlaylist.authorId !== currentUser.id || !targetPlaylist.isLocked) {
          throw createError(403);
        }

        report.targetPlaylist = targetPlaylist;

        break;
      }
      case "User": {
        const targetUser = await manager.findOne(UserEntity, targetId);
        if (targetUser === undefined) {
          throw createError(400);
        }
        if (targetUser.id !== currentUser.id || targetUser.permission !== "Read") {
          throw createError(403);
        }

        report.targetUser = targetUser;

        break;
      }
    }

    await manager.save(report);

    responseFindResult(req, res, report);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Objection",
  permission: "Write",
  hasBody: true
});
