import createError from "http-errors";
import { createGetOperation } from "../../../api/operation";
import { RevisionEntity } from "../../../database/entities";

export const GET = createGetOperation("Revision", "Read", async ({ manager, id }) => {
  const revision = await manager.findOne(RevisionEntity, id, {
    relations: ["summary"],
  });
  if (revision === undefined) {
    throw createError(404);
  }

  return [revision];
});
