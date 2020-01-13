import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { ExerciseEntity, GroupEntity, GroupExerciseEntity } from "../../database/entities";

export const GET = createSearchOperation("GroupExercise", "Read", async ({ manager, params }) => {
  const { groupId, exerciseId } = params;

  const query = manager
    .createQueryBuilder(GroupExerciseEntity, "groupExercise")
    .leftJoinAndSelect("groupExercise.group", "group")
    .leftJoinAndSelect("groupExercise.exercise", "exercise");

  if (groupId !== undefined) {
    query.andWhere("groupExercise.groupId = :groupId", { groupId });
  }
  if (exerciseId !== undefined) {
    query.andWhere("groupExercise.exerciseId = :exerciseId", { exerciseId });
  }

  return query;
});

export const POST = createPostOperation("GroupExercise", "Write", async ({ manager, params }) => {
  const { groupId, exerciseId } = params;
  if (groupId === undefined || exerciseId === undefined) {
    throw createError(400);
  }

  const group = await manager.findOne(GroupEntity, groupId);
  if (group === undefined) {
    throw createError(400);
  }
  const exercise = await manager.findOne(ExerciseEntity, exerciseId);
  if (exercise === undefined) {
    throw createError(400);
  }

  const groupExercise = new GroupExerciseEntity(group, exercise);
  await manager.save(groupExercise);

  return [groupExercise];
});
