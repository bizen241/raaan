import * as createError from "http-errors";
import { createGetOperation } from "../../../api/operation";
import { GroupEntity } from "../../../database/entities";

export const GET = createGetOperation("Group", "Read", async ({ manager, id }) => {
  const group = await manager.findOne(GroupEntity, id, {
    relations: ["owner"]
  });
  if (group === undefined) {
    throw createError(404);
  }

  return [group];
});
