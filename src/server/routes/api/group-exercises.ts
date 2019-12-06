import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { GroupExercise } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { ExerciseEntity, GroupEntity, GroupExerciseEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, exerciseId, searchLimit, searchOffset } = parseQuery("GroupExercise", req.query);

  const manager = getManager();

  const query = await manager
    .createQueryBuilder(GroupExerciseEntity, "groupExercise")
    .leftJoinAndSelect("groupExercise.group", "group")
    .leftJoinAndSelect("groupExercise.exercise", "exercise")
    .take(searchLimit)
    .skip(searchOffset);

  if (groupId !== undefined) {
    query.andWhere("groupExercise.groupId = :groupId", { groupId });
  }
  if (exerciseId !== undefined) {
    query.andWhere("groupExercise.exerciseId = :exerciseId", { exerciseId });
  }

  const [groupExercises, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groupExercises, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupExercise",
  permission: "Read",
  hasQuery: true
});

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
  permission: "Write",
  hasBody: true
});
