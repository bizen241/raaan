import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseDraft } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { getMinMaxTypeCount } from "../../../../shared/exercise";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseEntity, ExerciseTagEntity } from "../../../database/entities";
import { normalizeTags } from "../../../exercise";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseId }: PathParams = req.params;
  const params: SaveParams<ExerciseDraft> = req.body;

  const manager = getManager();

  const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary", "summary.tags", "draft"]
  });
  if (exercise === undefined) {
    return next(createError(404));
  }
  if (exercise.summary === undefined || exercise.summary.tags === undefined || exercise.draft === undefined) {
    return next(createError(500));
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor) {
    return next(createError(403));
  }

  if (params.title !== undefined) {
    exercise.draft.title = params.title;
  }
  if (params.tags !== undefined) {
    exercise.draft.tags = params.tags;
  }
  if (params.questions !== undefined) {
    exercise.questions = params.questions;
  }

  if (params.isMerged) {
    const tags: ExerciseTagEntity[] = [];
    normalizeTags(params.tags).forEach(async tagName => {
      tags.push(new ExerciseTagEntity(tagName));
    });

    const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

    exercise.title = exercise.draft.title;
    exercise.tags = exercise.draft.tags;
    exercise.questions = exercise.draft.questions;
    exercise.isDraft = false;

    exercise.summary.tags = tags;
    exercise.summary.maxTypeCount = maxTypeCount;
    exercise.summary.minTypeCount = minTypeCount;

    exercise.draft.isMerged = true;
  }

  await manager.save(exercise);

  responseFindResult(req, res, exercise);
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Update an exercise",
  permission: "Read",
  hasId: true,
  hasBody: true
});
