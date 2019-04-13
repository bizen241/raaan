import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseDetail } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseDetailEntity, ExerciseEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const params: SaveParams<ExerciseDetail> = req.body;

  await getManager().transaction(async manager => {
    const newExerciseDetail = new ExerciseDetailEntity({
      lang: params.lang || "en",
      title: params.title || "",
      tags: params.tags || [],
      description: params.description || "",
      rubric: params.rubric || "",
      questions: params.questions || [],
      comment: params.comment || "",
      navigationMode: params.navigationMode || "random"
    });
    await manager.save(newExerciseDetail);

    const newExercise = new ExerciseEntity(currentUser, newExerciseDetail);
    await manager.save(newExercise);
  });

  const savedExercise = await getManager().findOne(ExerciseDetailEntity);
  if (savedExercise === undefined) {
    return next(createError(500));
  }

  responseFindResult(res, savedExercise);
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseDetail",
  summary: "Create an exercise",
  permission: "Write",
  hasBody: true
});
