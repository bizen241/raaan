import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseDetailEntity } from "../../../database/entities";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseDetailId }: PathParams = req.params;
  const params: SaveParams<ExerciseDetail> = req.body;

  const manager = getManager();

  const exerciseDetail = await manager.findOne(ExerciseDetailEntity, exerciseDetailId, {
    relations: ["exercise"]
  });
  if (exerciseDetail === undefined || exerciseDetail.exercise === undefined) {
    return next(createError(500));
  }
  if (exerciseDetail.exercise.authorId !== currentUser.id) {
    return next(createError(403));
  }

  if (params.questions !== undefined) {
    exerciseDetail.questions = params.questions;
  }

  await manager.save(exerciseDetail);

  responseFindResult(res, exerciseDetail);
});

PATCH.apiDoc = createOperationDoc({
  entityType: "ExerciseDetail",
  summary: "Update a detail of exercise",
  permission: "Write",
  hasBody: true
});
