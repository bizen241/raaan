import createError from "http-errors";
import { createDeleteOperation, createGetOperation } from "../../api/operation";
import { setClearSiteData } from "../../auth";
import { UserEntity } from "../../database/entities";

export const GET = createGetOperation("User", "Read", async ({ currentUser, manager }) => {
  const user = await manager.findOne(UserEntity, currentUser.id, {
    relations: ["summary", "account", "config"],
  });
  if (user === undefined) {
    throw createError(500);
  }

  return [user];
});

export const DELETE = createDeleteOperation("User", "Read", async ({ res, currentUser, manager }) => {
  if (currentUser.permission === "Owner") {
    throw createError(403);
  }

  await manager.remove(currentUser);

  setClearSiteData(res);

  return [];
});
