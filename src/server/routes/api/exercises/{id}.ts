import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { getTypeCountFromQuestions } from "../../../../shared/exercise";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseEntity, ExerciseTagEntity } from "../../../database/entities";
import { normalizeTags } from "../../../exercise";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: exerciseId }: PathParams = req.params;

  const loadedExercise = await getManager().findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary"]
  });
  if (loadedExercise === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, loadedExercise);
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
    relations: ["author", "summary", "summary.tags"]
  });
  if (exercise === undefined || exercise.summary === undefined || exercise.summary.tags === undefined) {
    return next(createError(500));
  }
  if (exercise.authorId !== currentUser.id) {
    return next(createError(403));
  }

  if (params.title !== undefined) {
    exercise.title = params.title;
  }
  if (params.tags !== undefined) {
    await manager.remove(exercise.summary.tags);

    const tags: ExerciseTagEntity[] = [];
    normalizeTags(params.tags).forEach(async tagName => {
      tags.push(new ExerciseTagEntity(tagName));
    });

    exercise.tags = params.tags;
    exercise.summary.tags = tags;
  }
  if (params.questions !== undefined) {
    exercise.questions = params.questions;

    const { maxTypeCount, minTypeCount } = getTypeCountFromQuestions(params.questions);

    exercise.summary.maxTypeCount = maxTypeCount;
    exercise.summary.minTypeCount = minTypeCount;
  }
  if (params.isPrivate !== undefined && !exercise.isLocked) {
    exercise.isPrivate = params.isPrivate;
  }

  await manager.save(exercise);

  responseFindResult(req, res, exercise);
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

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Delete an exercise",
  permission: "Admin",
  hasId: true
});
