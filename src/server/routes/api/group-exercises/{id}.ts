import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { GroupExerciseEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: groupExerciseId }: PathParams = req.params;

  const manager = getManager();

  const groupExercise = await manager.findOne(GroupExerciseEntity, groupExerciseId);
  if (groupExercise === undefined) {
    return next(createError(404));
  }

  await manager.remove(groupExercise);

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "GroupExercise",
  permission: "Read",
  hasId: true
});
