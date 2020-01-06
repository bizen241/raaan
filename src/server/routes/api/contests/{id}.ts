import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { ContestEntity, GroupMemberEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("Contest", "Read", async ({ currentUser, manager, id }) => {
  const contest = await manager.findOne(ContestEntity, id);
  if (contest === undefined) {
    throw createError(404);
  }

  const groupMember = await manager
    .createQueryBuilder(GroupMemberEntity, "groupMember")
    .andWhere("groupMember.groupId = :groupId", { groupId: contest.groupId })
    .andWhere("groupMember.userId = :userId", { userId: currentUser.id })
    .getOne();
  if (groupMember === undefined || groupMember.permission === "read") {
    throw createError(403);
  }

  await manager.remove(contest);

  return [];
});
