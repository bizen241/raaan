import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { GroupApplicationEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("GroupApplication", "Read", async ({ currentUser, manager, id }) => {
  const groupApplication = await manager.findOne(GroupApplicationEntity, id, {
    relations: ["group"],
  });
  if (groupApplication === undefined) {
    throw createError(404);
  }
  if (groupApplication.group === undefined) {
    throw createError(500);
  }

  const isOwn = groupApplication.applicantId === currentUser.id;
  const isOwner = groupApplication.group.ownerId === currentUser.id;
  if (!isOwn && !isOwner) {
    throw createError(403);
  }

  await manager.remove(groupApplication);

  return [];
});
