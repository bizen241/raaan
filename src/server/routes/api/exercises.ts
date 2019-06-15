import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { getKeystrokesFromQuestions } from "../../../shared/exercise/keystrokes";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, ExerciseSummaryEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const params: SaveParams<Exercise> = req.body;

  await getManager().transaction(async manager => {
    const { maxKeystrokes, minKeystrokes } = getKeystrokesFromQuestions(params.questions);

    const newExerciseSummary = new ExerciseSummaryEntity(maxKeystrokes, minKeystrokes);
    const newExercise = new ExerciseEntity(currentUser, newExerciseSummary, params);

    await manager.save(newExercise);

    const savedExercise = await manager.findOne(ExerciseEntity, newExercise.id, {
      relations: ["author", "summary"]
    });
    if (savedExercise === undefined) {
      return next(createError(500));
    }

    responseFindResult(res, savedExercise);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Create an exercise",
  permission: "Write",
  hasBody: true
});
