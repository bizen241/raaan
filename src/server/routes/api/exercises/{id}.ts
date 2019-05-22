import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: exerciseId }: PathParams = req.params;

  const loadedExercise = await getManager().findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary"]
  });
  if (loadedExercise === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, loadedExercise);
});

GET.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Get an exercise",
  permission: "Guest",
  hasId: true
});

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseId }: PathParams = req.params;
  const params: SaveParams<Exercise> = req.body;

  const manager = getManager();

  const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary"]
  });
  if (exercise === undefined) {
    return next(createError(500));
  }
  if (exercise.authorId !== currentUser.id) {
    return next(createError(403));
  }

  if (params.questions !== undefined) {
    exercise.questions = params.questions;
  }

  await manager.save(exercise);

  responseFindResult(res, exercise);
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Update an exercise",
  permission: "Write",
  hasId: true,
  hasBody: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: exerciseId }: PathParams = req.params;

  const manager = getManager();

  const loadedExercise = await manager.findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary"]
  });
  if (loadedExercise === undefined) {
    return next(createError(404));
  }

  await manager.remove(loadedExercise);

  responseFindResult(res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Delete an exercise",
  permission: "Admin",
  hasId: true
});
