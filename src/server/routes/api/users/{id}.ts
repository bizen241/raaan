import * as createError from "http-errors";
import { createGetOperation } from "../../../api/operation";
import { UserEntity } from "../../../database/entities";

export const GET = createGetOperation("User", "Guest", async ({ manager, id }) => {
  const user = await manager.findOne(UserEntity, id, {
    relations: ["summary"]
  });
  if (user === undefined) {
    throw createError(404);
  }

  return [user];
});
