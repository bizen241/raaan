import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ExerciseDraft } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { getMinMaxTypeCount } from "../../../shared/exercise";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseDraftEntity, ExerciseEntity, ExerciseSummaryEntity, getTags } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { isMerged = true, isPrivate = true, ...params }: Params<ExerciseDraft> = req.body;

  await getManager().transaction(async manager => {
    const exerciseDraft = new ExerciseDraftEntity(params);
    exerciseDraft.isMerged = isMerged;

    const exerciseSummary = new ExerciseSummaryEntity();
    if (isMerged) {
      const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

      exerciseSummary.maxTypeCount = maxTypeCount;
      exerciseSummary.minTypeCount = minTypeCount;
      exerciseSummary.tags = await getTags(exerciseSummary, params, manager);
    }

    const exercise = new ExerciseEntity(isMerged ? params : {});
    exercise.author = currentUser;
    exercise.summary = exerciseSummary;
    exercise.draft = exerciseDraft;
    exercise.isDraft = !isMerged;
    exercise.isPrivate = isPrivate;
    await manager.save(exercise);

    exerciseSummary.exercise = exercise;

    responseFindResult(req, res, exercise, exerciseSummary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseDraft",
  permission: "Read",
  hasBody: true
});
