import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { GroupApplicationEntity, GroupEntity, GroupInvitationEntity, GroupMemberEntity } from "../../database/entities";

export const GET = createSearchOperation("GroupMember", "Read", async ({ manager, params }) => {
  const { groupId, userId } = params;

  const query = manager
    .createQueryBuilder(GroupMemberEntity, "groupMember")
    .leftJoinAndSelect("groupMember.group", "group")
    .leftJoinAndSelect("groupMember.user", "user")
    .leftJoinAndSelect("group.summary", "summary");

  if (groupId !== undefined) {
    query.andWhere("groupMember.groupId = :groupId", { groupId });
  }
  if (userId !== undefined) {
    query.andWhere("groupMember.userId = :userId", { userId });
  }

  return query;
});

export const POST = createPostOperation("GroupMember", "Read", async ({ currentUser, manager, params }) => {
  const { groupId, userId } = params;
  if (groupId === undefined) {
    throw createError(400);
  }

  const group = await manager.findOne(GroupEntity, groupId);
  if (group === undefined) {
    throw createError(400);
  }

  if (currentUser.id !== group.ownerId) {
    const groupInvitation = await manager.findOne(GroupInvitationEntity, {
      group: {
        id: groupId,
      },
      target: {
        id: currentUser.id,
      },
    });
    if (groupInvitation === undefined) {
      throw createError(403);
    }

    await manager.remove(groupInvitation);

    const groupMember = new GroupMemberEntity(group, currentUser);
    await manager.save(groupMember);

    return [groupMember];
  } else {
    if (userId === undefined) {
      throw createError(400);
    }

    const groupApplication = await manager.findOne(GroupApplicationEntity, {
      where: {
        group: {
          id: groupId,
        },
        applicant: {
          id: userId,
        },
      },
      relations: ["applicant"],
    });
    if (groupApplication === undefined) {
      throw createError(403);
    }
    if (groupApplication.applicant === undefined) {
      throw createError(500);
    }

    await manager.remove(groupApplication);

    const groupMember = new GroupMemberEntity(group, groupApplication.applicant);
    await manager.save(groupMember);

    return [groupMember];
  }
});
