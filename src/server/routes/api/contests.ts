import createError from "http-errors";
import { createPostOperation, createSearchOperation, existOrFail } from "../../api/operation";
import { ContestEntity, ExerciseEntity, GroupMemberEntity } from "../../database/entities";

export const GET = createSearchOperation("Contest", "Read", async ({ currentUser, manager, params }) => {
  const { groupId } = params;

  const groupMember = await manager
    .createQueryBuilder(GroupMemberEntity, "groupMember")
    .andWhere("groupMember.groupId = :groupId", { groupId })
    .andWhere("groupMember.userId = :userId", { userId: currentUser.id })
    .getOne();
  if (groupMember === undefined) {
    throw createError(403);
  }

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
    .leftJoinAndSelect("groupMember.group", "group")
    .andWhere("groupMember.groupId = :groupId", { groupId })
    .andWhere("groupMember.userId = :userId", { userId: currentUser.id })
    .getOne();
  if (groupMember === undefined || groupMember.permission === "read") {
    throw createError(403);
  }

  const group = existOrFail(groupMember.group);

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
