import * as createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { ReportEntity } from "../../database/entities";
import { getDefendant } from "../../services/reports";

export const POST = createPostOperation("Report", "Write", async ({ currentUser, manager, params }) => {
  const { targetType, targetId, reason, description = "" } = params;
  if (targetType === undefined || targetId === undefined || reason === undefined) {
    throw createError(400);
  }

  const defendant = await getDefendant(manager, targetType, targetId);
  const report = new ReportEntity(currentUser, defendant, reason, description);

  report.targetType = targetType;
  report.targetId = targetId;

  await manager.save(report);

  return [report];
});
