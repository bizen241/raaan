import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { GroupEntity, GroupInvitationEntity, UserEntity, UserFollowEntity } from "../../database/entities";

export const GET = createSearchOperation("GroupInvitation", "Read", async ({ manager, params }) => {
  const { groupId, targetId, ownerId } = params;

  const query = manager
    .createQueryBuilder(GroupInvitationEntity, "groupInvitation")
    .leftJoinAndSelect("groupInvitation.group", "group")
    .leftJoinAndSelect("groupInvitation.target", "target")
    .leftJoinAndMapOne("group.summary", "group.summary", "groupSummary")
    .leftJoinAndMapOne("target.summary", "target.summary", "targetSummary");

  if (groupId !== undefined) {
    query.andWhere("groupInvitation.groupId = :groupId", { groupId });
  }
  if (targetId !== undefined) {
    query.andWhere("groupInvitation.targetId = :targetId", { targetId });
  }
  if (ownerId !== undefined) {
    query.andWhere("group.ownerId = :ownerId", { ownerId });
  }

  return query;
});

export const POST = createPostOperation("GroupInvitation", "Write", async ({ currentUser, manager, params }) => {
  const { groupId, targetId } = params;

  const group = await manager.findOne(GroupEntity, groupId);
  if (group === undefined) {
    throw createError(400);
  }

  const target = await manager.findOne(UserEntity, targetId);
  if (target === undefined) {
    throw createError(400);
  }

  const userFollow = await manager
    .createQueryBuilder(UserFollowEntity, "userFollow")
    .andWhere("userFollow.targetId = :targetId", { targetId: currentUser.id })
    .andWhere("userFollow.followerId = :followerId", { followerId: targetId })
    .getOne();
  if (userFollow === undefined) {
    throw createError(403);
  }

  const groupInvitation = new GroupInvitationEntity(group, target);
  await manager.save(groupInvitation);

  return [groupInvitation];
});
