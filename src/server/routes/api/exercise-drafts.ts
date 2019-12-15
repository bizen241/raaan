import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseDraft } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { getMinMaxTypeCount } from "../../../shared/exercise";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  RevisionEntity,
  UserSummaryEntity,
  RevisionSummaryEntity
} from "../../database/entities";
import { getTags } from "../../services/tags";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { isMerged = true, isPrivate = true, ...params }: Params<ExerciseDraft> = req.body;

  await getManager().transaction(async manager => {
    const authorSummary = await manager.findOne(UserSummaryEntity, currentUser.summaryId);
    if (authorSummary === undefined) {
      throw createError(500, "authorSummary is not defined");
    }

    const exerciseSummary = new ExerciseSummaryEntity();
    if (isMerged) {
      const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

      exerciseSummary.maxTypeCount = maxTypeCount;
      exerciseSummary.minTypeCount = minTypeCount;
      exerciseSummary.tags = await getTags(exerciseSummary, params, manager);
    }

    const exerciseDraft = new ExerciseDraftEntity(params);
    exerciseDraft.isMerged = isMerged;

    const exercise = new ExerciseEntity(exerciseSummary, currentUser, exerciseDraft);
    exercise.isDraft = !isMerged;
    exercise.isPrivate = isPrivate;
    await manager.save(exercise);

    const revisionSummary = new RevisionSummaryEntity();
    const revision = new RevisionEntity(revisionSummary, exercise, isMerged ? params : {}, isPrivate);
    await manager.save(revision);

    if (exercise.author === undefined) {
      throw createError(500, "exercise.author is not defined");
    }
    if (exercise.summary === undefined) {
      throw createError(500, "exercise.summary is not defined");
    }

    exercise.author.summary = authorSummary;
    exercise.author.summary.user = exercise.author;
    exercise.summary.exercise = exercise;
    exercise.latest = revision;

    responseFindResult(req, res, exercise);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseDraft",
  permission: "Read",
  hasBody: true
});
