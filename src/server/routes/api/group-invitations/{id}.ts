import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { GroupInvitationEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("GroupInvitation", "Read", async ({ currentUser, manager, id }) => {
  const groupInvitation = await manager.findOne(GroupInvitationEntity, id, {
    relations: ["group"],
  });
  if (groupInvitation === undefined) {
    throw createError(404);
  }
  if (groupInvitation.group === undefined) {
    throw createError(500);
  }

  const isOwn = groupInvitation.targetId === currentUser.id;
  const isOwner = groupInvitation.group.ownerId === currentUser.id;
  if (!isOwn && !isOwner) {
    throw createError(403);
  }

  await manager.remove(groupInvitation);

  return [];
});
