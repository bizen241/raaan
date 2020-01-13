import createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { GroupSecretEntity } from "../../database/entities";

export const GET = createSearchOperation("GroupSecret", "Read", async ({ manager, params }) => {
  const { groupId, value } = params;
  if (groupId === undefined || value === undefined) {
    throw createError(400);
  }

  const query = manager
    .createQueryBuilder(GroupSecretEntity, "groupSecret")
    .leftJoinAndSelect("groupSecret.group", "group")
    .andWhere("groupSecret.groupId = :groupId", { groupId })
    .andWhere("groupSecret.value = :value", { value });

  return query;
});
