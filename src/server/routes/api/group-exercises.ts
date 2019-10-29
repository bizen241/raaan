import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { GroupExercise } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, GroupEntity, GroupExerciseEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next) => {
  const { groupId, exerciseId }: Params<GroupExercise> = req.body;
  if (groupId === undefined || exerciseId === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const group = await manager.findOne(GroupEntity, groupId);
    if (group === undefined) {
      return next(createError(404));
    }
    const exercise = await manager.findOne(ExerciseEntity, exerciseId);
    if (exercise === undefined) {
      return next(createError(404));
    }

    const groupExercise = new GroupExerciseEntity(group, exercise);
    await manager.save(groupExercise);

    responseFindResult(req, res, groupExercise);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "GroupExercise",
  summary: "Create GroupExercise",
  permission: "Write",
  hasBody: true
});
