import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Report } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  GroupEntity,
  PlaylistEntity,
  ReportEntity,
  SynonymEntity,
  TagEntity,
  UserEntity
} from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { targetType, targetId, reason, description = "" }: Params<Report> = req.body;
  if (targetType === undefined || targetId === undefined || reason === undefined) {
    throw createError(400);
  }

  await getManager().transaction(async manager => {
    const report = new ReportEntity(currentUser, reason, description);

    switch (targetType) {
      case "Exercise": {
        const targetExercise = await manager.findOne(ExerciseEntity, targetId);
        if (targetExercise === undefined) {
          throw createError(400);
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

        report.targetPlaylist = targetPlaylist;

        break;
      }
      case "Synonym": {
        const targetSynonym = await manager.findOne(SynonymEntity, targetId);
        if (targetSynonym === undefined) {
          throw createError(400);
        }

        report.targetSynonym = targetSynonym;

        break;
      }
      case "Tag": {
        const targetTag = await manager.findOne(TagEntity, targetId);
        if (targetTag === undefined) {
          throw createError(400);
        }

        report.targetTag = targetTag;

        break;
      }
      case "User": {
        const targetUser = await manager.findOne(UserEntity, targetId);
        if (targetUser === undefined) {
          throw createError(400);
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
  entityType: "Report",
  permission: "Write",
  hasBody: true
});
