import * as createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { hasPermission } from "../../api/security";
import { ReportSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("ReportSummary", "Read", async ({ currentUser, manager, params }) => {
  const { reporterId, defendantId, targetType, targetId } = params;

  const isReporter = reporterId === currentUser.id;
  if (!isReporter && !hasPermission(currentUser, "Admin")) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(ReportSummaryEntity, "reportSummary")
    .leftJoinAndSelect("reportSummary.parent", "parent");

  if (reporterId !== undefined) {
    query.andWhere("parent.reporterId = :reporterId", { reporterId });
  }
  if (defendantId !== undefined) {
    query.andWhere("parent.defendantId = :defendantId", { defendantId });
  }
  if (targetType !== undefined) {
    query.andWhere("parent.targetType", { targetType });

    if (targetId !== undefined) {
      query.andWhere("parent.targetId = :targetId", { targetId });
    }
  }

  return query;
});
