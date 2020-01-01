import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { hasPermission } from "../../../api/security";
import { ExerciseEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { id: exerciseId }: PathParams = req.params;

  const exercise = await getManager()
    .createQueryBuilder(ExerciseEntity, "exercise")
    .leftJoinAndSelect("exercise.summary", "summary")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.latest", "latest")
    .leftJoinAndSelect("exercise.draft", "draft")
    .leftJoinAndSelect("summary.tags", "tags")
    .leftJoinAndMapOne("author.summary", "author.summary", "authorSummary")
    .where("exercise.id = :exerciseId", { exerciseId })
    .getOne();
  if (exercise === undefined) {
    throw createError(404);
  }

  if (exercise.isPrivate && exercise.authorId !== currentUser.id) {
    throw createError(403);
  }

  responseFindResult(req, res, exercise);
});

GET.apiDoc = createOperationDoc({
  entityType: "Exercise",
  permission: "Guest",
  hasId: true
});

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseId }: PathParams = req.params;
  const params: Params<Exercise> = req.body;

  const manager = getManager();

  const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
    relations: ["summary", "summary.tags", "author", "author.summary", "latest", "draft"]
  });
  if (exercise === undefined) {
    return next(createError(404));
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  if (isAuthor) {
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
  permission: "Read",
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
  permission: "Read",
  hasId: true
});
