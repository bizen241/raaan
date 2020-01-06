import { createSearchOperation } from "../../api/operation";
import { GroupSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("GroupSummary", "Guest", async ({ manager, params }) => {
  const { ownerId } = params;

  const query = manager
    .createQueryBuilder(GroupSummaryEntity, "groupSummary")
    .leftJoinAndSelect("groupSummary.group", "group");

  if (ownerId !== undefined) {
    query.andWhere("group.ownerId = :ownerId", { ownerId });
  }

  return query;
});
