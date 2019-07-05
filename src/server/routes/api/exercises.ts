import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { getTypeCountFromQuestions } from "../../../shared/exercise";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, ExerciseSummaryEntity, ExerciseTagEntity } from "../../database/entities";
import { normalizeTags } from "../../exercise";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const params: SaveParams<Exercise> = req.body;

  await getManager().transaction(async manager => {
    const { maxTypeCount, minTypeCount } = getTypeCountFromQuestions(params.questions);

    const tags: ExerciseTagEntity[] = [];
    normalizeTags(params.tags).forEach(async tag => {
      tags.push(new ExerciseTagEntity(tag));
    });

    const newExerciseSummary = new ExerciseSummaryEntity(maxTypeCount, minTypeCount, tags);
    const newExercise = new ExerciseEntity(currentUser, newExerciseSummary, params);

    await manager.save(newExercise);

    const savedExercise = await manager.findOne(ExerciseEntity, newExercise.id, {
      relations: ["author", "summary"]
    });
    if (savedExercise === undefined) {
      return next(createError(500));
    }

    responseFindResult(req, res, savedExercise);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Create an exercise",
  permission: "Write",
  hasBody: true
});
