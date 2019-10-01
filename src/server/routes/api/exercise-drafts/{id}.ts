import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseDraft } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { getMinMaxTypeCount } from "../../../../shared/exercise";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseDraftEntity, ExerciseEntity, RevisionEntity, RevisionSummaryEntity } from "../../../database/entities";
// import { normalizeTags } from "../../../exercise";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseDraftId }: PathParams = req.params;
  const params: Params<ExerciseDraft> = req.body;

  const manager = getManager();

  const exerciseDraft = await manager.findOne(ExerciseDraftEntity, exerciseDraftId);
  if (exerciseDraft === undefined) {
    return next(createError(404));
  }

  const exercise = await manager.findOne(ExerciseEntity, exerciseDraft.exerciseId, {
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
    if (!exercise.isDraft) {
      const revisions = await manager.find(RevisionEntity, {
        where: {
          exercise: {
            id: exercise.id
          }
        },
        order: {
          createdAt: "DESC"
        }
      });

      if (revisions.length > 4) {
        await manager.remove(revisions[0]);
      }

      const revisionSummary = new RevisionSummaryEntity();

      const revision = new RevisionEntity({
        title: exercise.title,
        tags: exercise.tags,
        questions: exercise.questions
      });
      revision.exercise = exercise;
      revision.summary = revisionSummary;
      await manager.save(revision);
    }

    const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

    exercise.title = exercise.draft.title;
    exercise.tags = exercise.draft.tags;
    exercise.questions = exercise.draft.questions;
    exercise.isDraft = false;

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
