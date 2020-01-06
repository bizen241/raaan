import * as createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { SynonymEntity } from "../../database/entities";

export const GET = createSearchOperation("Synonym", "Guest", async ({ manager }) => {
  const query = manager.createQueryBuilder(SynonymEntity, "synonym");

  return query;
});

export const POST = createPostOperation("Synonym", "Admin", async ({ manager, params }) => {
  const { name, target } = params;
  if (name === undefined || target === undefined) {
    throw createError(400);
  }

  const synonym = new SynonymEntity(name, target);
  await manager.save(synonym);

  return [synonym];
});
