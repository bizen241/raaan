import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: contentId }: PathParams = req.params;

  const loadedExercise = await getManager().findOne(ExerciseEntity, contentId, {
    relations: ["author", "latest", "tags"]
  });
  if (loadedExercise === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, loadedExercise);
});

GET.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Get a content",
  permission: "Guest",
  hasId: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: contentId }: PathParams = req.params;

  const manager = getManager();

  const loadedExercise = await manager.findOne(ExerciseEntity, contentId, {
    relations: ["author", "latest", "tags"]
  });
  if (loadedExercise === undefined) {
    return next(createError(404));
  }

  await manager.remove(loadedExercise);

  responseFindResult(res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Delete a content",
  permission: "Admin",
  hasId: true
});
