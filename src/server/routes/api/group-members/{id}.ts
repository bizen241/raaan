import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { GroupMemberEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("GroupInvitation", "Read", async ({ currentUser, manager, id }) => {
  const groupMember = await manager.findOne(GroupMemberEntity, id, {
    relations: ["group"]
  });
  if (groupMember === undefined) {
    throw createError(404);
  }
  if (groupMember.group === undefined) {
    throw createError(500);
  }

  const isOwn = groupMember.userId === currentUser.id;
  const isOwner = groupMember.group.ownerId === currentUser.id;
  if (!isOwn && !isOwner) {
    throw createError(403);
  }

  await manager.remove(groupMember);

  return [];
});
