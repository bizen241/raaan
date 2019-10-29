import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseReportEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseReportId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const exerciseReport = await manager.findOne(ExerciseReportEntity, exerciseReportId);
    if (exerciseReport === undefined) {
      return next(createError(404));
    }

    const isReportr = exerciseReport.reporterId === currentUser.id;
    if (!isReportr) {
      return next(createError(403));
    }

    await manager.remove(exerciseReport);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "ExerciseReport",
  permission: "Read",
  hasId: true
});
