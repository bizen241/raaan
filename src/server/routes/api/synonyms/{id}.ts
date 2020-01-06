import * as createError from "http-errors";
import { createDeleteOperation, createGetOperation } from "../../../api/operation";
import { SynonymEntity } from "../../../database/entities";

export const GET = createGetOperation("Synonym", "Guest", async ({ manager, id }) => {
  const synonym = await manager.findOne(SynonymEntity, id);
  if (synonym === undefined) {
    throw createError(404);
  }

  return [synonym];
});

export const DELETE = createDeleteOperation("Synonym", "Admin", async ({ manager, id }) => {
  const synonym = await manager.findOne(SynonymEntity, id);
  if (synonym === undefined) {
    throw createError(404);
  }

  await manager.remove(synonym);

  return [];
});
