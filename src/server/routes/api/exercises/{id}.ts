import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { getTypeCountFromQuestions } from "../../../../shared/exercise";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { hasPermission } from "../../../api/security";
import { ExerciseEntity, ExerciseTagEntity } from "../../../database/entities";
import { normalizeTags } from "../../../exercise";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: exerciseId }: PathParams = req.params;

  const exercise = await getManager().findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary", "summary.tags"]
  });
  if (exercise === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, exercise);
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
  if (exercise === undefined) {
    return next(createError(404));
  }
  if (exercise.summary === undefined || exercise.summary.tags === undefined) {
    return next(createError(500));
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  if (isAuthor) {
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
      console.log(params.questions);
      exercise.questions = params.questions;

      const { maxTypeCount, minTypeCount } = getTypeCountFromQuestions(params.questions);

      exercise.summary.maxTypeCount = maxTypeCount;
      exercise.summary.minTypeCount = minTypeCount;
    }
    if (params.isPrivate !== undefined) {
      if (!exercise.isLocked) {
        exercise.isPrivate = params.isPrivate;
      }
    }
  } else {
    if (params.isLocked !== undefined) {
      exercise.isLocked = params.isLocked;

      if (params.isLocked) {
        exercise.isPrivate = true;
      }
    }
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

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseId }: PathParams = req.params;

  const manager = getManager();

  const exercise = await manager.findOne(ExerciseEntity, exerciseId);
  if (exercise === undefined) {
    return next(createError(404));
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor) {
    return next(createError(403));
  }

  await manager.remove(exercise);

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Delete an exercise",
  permission: "Read",
  hasId: true
});
