import { createSearchOperation } from "../../api/operation";
import { TagSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("TagSummary", "Guest", async ({ manager }) => {
  const query = manager.createQueryBuilder(TagSummaryEntity, "tagSummary").leftJoinAndSelect("tagSummary.tag", "tag");

  return query;
});
