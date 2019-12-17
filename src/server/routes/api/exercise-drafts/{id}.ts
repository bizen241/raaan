import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseDraft } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { getMinMaxTypeCount } from "../../../../shared/exercise";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseDraftEntity, ExerciseEntity, RevisionEntity, RevisionSummaryEntity } from "../../../database/entities";
import { getTags } from "../../../services/tags";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseDraftId }: PathParams = req.params;

  const exerciseDraft = await getManager().findOne(ExerciseDraftEntity, exerciseDraftId, {
    relations: ["exercise"]
  });
  if (exerciseDraft === undefined) {
    return next(createError(404));
  }
  if (exerciseDraft.exercise === undefined) {
    return next(createError(500));
  }

  const isAuthor = exerciseDraft.exercise.authorId === currentUser.id;
  if (!isAuthor) {
    return next(createError(403));
  }

  responseFindResult(req, res, exerciseDraft);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseDraft",
  permission: "Read",
  hasId: true
});

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseDraftId }: PathParams = req.params;
  const { isMerged = true, ...params }: Params<ExerciseDraft> = req.body;

  await getManager().transaction(async manager => {
    const exerciseDraft = await manager.findOne(ExerciseDraftEntity, exerciseDraftId);
    if (exerciseDraft === undefined) {
      return next(createError(404));
    }

    const exercise = await manager.findOne(ExerciseEntity, exerciseDraft.exerciseId, {
      relations: ["author", "author.summary", "summary", "summary.tags", "summary.tags.summary", "latest", "draft"]
    });
    if (exercise === undefined) {
      return next(createError(404));
    }
    if (
      exercise.summary === undefined ||
      exercise.summary.tags === undefined ||
      exercise.latest === undefined ||
      exercise.draft === undefined
    ) {
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
      exercise.draft.questions = params.questions;
    }

    if (isMerged) {
      if (exercise.isDraft) {
        if (params.title !== undefined) {
          exercise.latest.title = params.title;
        }
        if (params.tags !== undefined) {
          exercise.latest.tags = params.tags;
        }
        if (params.questions !== undefined) {
          exercise.latest.questions = params.questions;
        }
      } else {
        const revisionSummary = new RevisionSummaryEntity();
        const revision = new RevisionEntity(
          revisionSummary,
          exercise,
          {
            title: params.title || exercise.draft.title,
            tags: params.tags || exercise.draft.tags,
            questions: params.questions || exercise.draft.questions
          },
          exercise.isPrivate
        );
        await manager.save(revision);

        exercise.latest = revision;
      }

      const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

      exercise.isDraft = false;

      exercise.summary.maxTypeCount = maxTypeCount;
      exercise.summary.minTypeCount = minTypeCount;
      exercise.summary.tags = await getTags(exercise.summary, params, manager);

      exercise.draft.isMerged = true;
    }

    await manager.save(exercise);

    responseFindResult(req, res, exercise, exercise.draft);
  });
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Exercise",
  permission: "Read",
  hasId: true,
  hasBody: true
});
