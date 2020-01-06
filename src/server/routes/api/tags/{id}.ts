import * as createError from "http-errors";
import { createPatchOperation } from "../../../api/operation";
import { TagEntity } from "../../../database/entities";

export const PATCH = createPatchOperation("Tag", "Admin", async ({ manager, id, params }) => {
  const tag = await manager.findOne(TagEntity, id);
  if (tag === undefined) {
    throw createError(404);
  }

  if (params.description !== undefined) {
    tag.description = params.description;
  }

  await manager.save(tag);

  return [tag];
});
