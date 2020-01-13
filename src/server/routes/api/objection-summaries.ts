import createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { hasPermission } from "../../api/security";
import { ObjectionSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("ObjectionSummary", "Read", async ({ currentUser, manager, params }) => {
  const { objectorId, targetType, targetId } = params;

  const isObjector = objectorId === currentUser.id;
  if (!isObjector && !hasPermission(currentUser, "Admin")) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(ObjectionSummaryEntity, "objectionSummary")
    .leftJoinAndSelect("objectionSummary.parent", "parent");

  if (objectorId !== undefined) {
    query.andWhere("parent.objectorId = :objectorId", { objectorId });
  }
  if (targetType !== undefined) {
    query.andWhere("parent.targetType", { targetType });

    if (targetId !== undefined) {
      query.andWhere("parent.targetId = :targetId", { targetId });
    }
  }

  return query;
});
