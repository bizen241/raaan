import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseReport } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, ExerciseReportEntity } from "../../database/entities";

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
  summary: "Report",
  permission: "Write",
  hasBody: true
});
