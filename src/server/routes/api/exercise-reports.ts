import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseReport } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import { ExerciseEntity, ExerciseReportEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { reporterId, targetId, searchLimit, searchOffset } = parseQuery<ExerciseReport>("ExerciseReport", req.query);

  const isReporter = reporterId === currentUser.id;
  if (!isReporter && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(ExerciseReportEntity, "exerciseReport")
    .take(searchLimit)
    .skip(searchOffset);

  if (reporterId !== undefined) {
    query.andWhere("exerciseReport.reporterId = :reporterId", { reporterId });
  }
  if (targetId !== undefined) {
    query.andWhere("exerciseReport.targetId = :targetId", { targetId });
  }

  const [exerciseReports, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseReports, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseReport",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { targetId, reason, comment = "" }: Params<ExerciseReport> = req.body;
  if (reason === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const target = await manager.findOne(ExerciseEntity, targetId);
    if (target === undefined) {
      return next(createError(404));
    }

    const exerciseReport = new ExerciseReportEntity(currentUser, target);
    exerciseReport.reason = reason;
    exerciseReport.comment = comment;
    await manager.save(exerciseReport);

    responseFindResult(req, res, exerciseReport);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseReport",
  permission: "Write",
  hasBody: true
});
