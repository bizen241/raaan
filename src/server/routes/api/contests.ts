import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { ContestEntity, ExerciseEntity, GroupEntity, GroupMemberEntity } from "../../database/entities";

export const GET = createSearchOperation("Contest", "Read", async ({ manager, params }) => {
  const { groupId } = params;

  const query = manager
    .createQueryBuilder(ContestEntity, "contest")
    .leftJoinAndSelect("contest.group", "group")
    .leftJoinAndSelect("contest.exercise", "exercise");

  if (groupId !== undefined) {
    query.andWhere("contest.groupId = :groupId", { groupId });
  }

  return query;
});

export const POST = createPostOperation("Contest", "Write", async ({ currentUser, manager, params }) => {
  const { groupId, exerciseId } = params;
  if (params.startAt === undefined || params.finishAt === undefined) {
    throw createError(400);
  }

  const groupMember = await manager
    .createQueryBuilder(GroupMemberEntity, "groupMember")
    .andWhere("groupMember.groupId = :groupId", { groupId })
    .andWhere("groupMember.userId = :userId", { userId: currentUser.id })
    .getOne();
  if (groupMember === undefined || groupMember.permission === "read") {
    throw createError(403);
  }

  const group = await manager.findOne(GroupEntity, groupId);
  if (group === undefined) {
    throw createError(500);
  }

  const exercise = await manager.findOne(ExerciseEntity, exerciseId);
  if (exercise === undefined) {
    throw createError(400);
  }

  const startAt = new Date(params.startAt);
  const finishAt = new Date(params.finishAt);

  const contest = new ContestEntity(group, exercise, "", startAt, finishAt);
  await manager.save(contest);

  return [contest];
});
