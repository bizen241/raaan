import { createSearchOperation } from "../../api/operation";
import { TagEntity } from "../../database/entities";

export const GET = createSearchOperation("Tag", "Read", async ({ manager, params }) => {
  const { name } = params;

  const query = manager.createQueryBuilder(TagEntity, "tag");

  if (name !== undefined) {
    query.andWhere("tag.name = :name", { name });
  }

  return query;
});
