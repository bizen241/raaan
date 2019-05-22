import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, ExerciseSummaryEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const params: SaveParams<Exercise> = req.body;

  let exerciseId: string | undefined;

  await getManager().transaction(async manager => {
    const newExerciseSummary = new ExerciseSummaryEntity();
    const newExercise = new ExerciseEntity(currentUser, newExerciseSummary, params);

    await manager.save(newExercise);

    exerciseId = newExercise.id;
  });
  if (exerciseId === undefined) {
    return next(createError(500));
  }

  const savedExercise = await getManager().findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary"]
  });
  if (savedExercise === undefined) {
    return next(createError(500));
  }

  responseFindResult(res, savedExercise);
});

POST.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Create an exercise",
  permission: "Write",
  hasBody: true
});
