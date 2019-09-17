import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { getMinMaxTypeCount } from "../../../shared/exercise";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseDraftEntity, ExerciseEntity, ExerciseSummaryEntity, ExerciseTagEntity } from "../../database/entities";
import { normalizeTags } from "../../exercise";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const params: SaveParams<Exercise> = req.body;

  await getManager().transaction(async manager => {
    const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

    const tags: ExerciseTagEntity[] = [];
    normalizeTags(params.tags).forEach(async tag => {
      tags.push(new ExerciseTagEntity(tag));
    });

    const exerciseSummary = new ExerciseSummaryEntity();
    exerciseSummary.maxTypeCount = maxTypeCount;
    exerciseSummary.minTypeCount = minTypeCount;
    exerciseSummary.tags = tags;
    await manager.save(exerciseSummary);

    const exerciseDraft = new ExerciseDraftEntity(params);
    exerciseDraft.isMerged = false;
    await manager.save(exerciseDraft);

    const exercise = new ExerciseEntity(params);
    exercise.author = currentUser;
    exercise.summary = exerciseSummary;
    exercise.draft = exerciseDraft;
    exercise.isDraft = true;

    await manager.save(exercise);

    responseFindResult(req, res, exercise);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Create an exercise",
  permission: "Write",
  hasBody: true
});
