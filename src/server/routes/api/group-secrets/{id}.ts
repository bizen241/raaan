import * as createError from "http-errors";
import * as uuid from "uuid/v4";
import { createGetOperation, createPatchOperation } from "../../../api/operation";
import { GroupSecretEntity } from "../../../database/entities";

export const GET = createGetOperation("GroupSecret", "Read", async ({ currentUser, manager, id }) => {
  const groupSecret = await manager.findOne(GroupSecretEntity, id, {
    relations: ["group"]
  });
  if (groupSecret === undefined) {
    throw createError(404);
  }
  if (groupSecret.group === undefined) {
    throw createError(500);
  }

  const isGroupOwner = groupSecret.group.ownerId === currentUser.id;
  if (!isGroupOwner) {
    throw createError(403);
  }

  return [groupSecret];
});

export const PATCH = createPatchOperation("GroupSecret", "Read", async ({ currentUser, manager, id, params }) => {
  const { expireAt } = params;
  if (expireAt === undefined) {
    throw createError(400);
  }

  const groupSecret = await manager.findOne(GroupSecretEntity, id, {
    relations: ["group"]
  });
  if (groupSecret === undefined) {
    throw createError(404);
  }
  if (groupSecret.group === undefined) {
    throw createError(500);
  }

  const isGroupOwner = groupSecret.group.ownerId === currentUser.id;
  if (!isGroupOwner) {
    throw createError(403);
  }

  groupSecret.value = uuid();
  groupSecret.expireAt = new Date(expireAt);

  await manager.save(groupSecret);

  return [groupSecret];
});
