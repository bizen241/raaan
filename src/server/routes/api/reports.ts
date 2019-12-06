import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Report } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import {
  ExerciseEntity,
  GroupEntity,
  PlaylistEntity,
  ReportEntity,
  SynonymEntity,
  TagEntity,
  UserEntity
} from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { reporterId, targetType, targetId, searchLimit, searchOffset } = parseQuery("Report", req.query);

  const isReporter = reporterId === currentUser.id;
  if (!isReporter && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = getManager()
    .createQueryBuilder(ReportEntity, "report")
    .take(searchLimit)
    .skip(searchOffset);

  if (reporterId !== undefined) {
    query.andWhere("report.reporterId = :reporterId", { reporterId });
  }
  if (targetType !== undefined) {
    if (targetId !== undefined) {
      query.andWhere(`report.target${targetType}Id = :targetId`, { targetId });
    } else {
      query.andWhere(`report.target${targetType}Id IS NOT NULL`);
    }
  }

  const [reports, count] = await query.getManyAndCount();

  responseSearchResult(req, res, reports, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Report",
  permission: "Read",
  hasQuery: true
});

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
