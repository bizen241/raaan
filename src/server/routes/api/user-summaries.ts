import { createSearchOperation } from "../../api/operation";
import { UserSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("UserSummary", "Guest", async ({ manager }) => {
  const query = manager
    .createQueryBuilder(UserSummaryEntity, "useSummary")
    .leftJoinAndSelect("useSummary.user", "user")
    .andWhere("user.permission <> :permission", { permission: "Guest" });

  return query;
});
