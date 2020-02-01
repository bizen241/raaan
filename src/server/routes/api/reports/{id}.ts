import createError from "http-errors";
import { hasPermission } from "../../../../shared/api/security";
import { createDeleteOperation, createGetOperation, createPatchOperation } from "../../../api/operation";
import { ReportCommentEntity, ReportEntity } from "../../../database/entities";
import { lockReportTarget } from "../../../services/reports";

export const GET = createGetOperation("Report", "Read", async ({ manager, id }) => {
  const report = await manager.findOne(ReportEntity, id, {
    relations: ["summary"]
  });
  if (report === undefined) {
    throw createError(404);
  }

  return [report];
});

export const PATCH = createPatchOperation("Report", "Write", async ({ currentUser, manager, id, params }) => {
  const report = await manager.findOne(ReportEntity, id);
  if (report === undefined) {
    throw createError(404);
  }

  const isReporter = report.reporterId === currentUser.id;
  if (!isReporter && !hasPermission(currentUser, "Admin")) {
    throw createError(403);
  }

  if (isReporter) {
    if (params.reason !== undefined) {
      report.reason = params.reason;
    }
    if (params.description !== undefined) {
      report.description = params.description;
    }
  } else {
    if (report.state !== "accepted" && params.state === "accepted") {
      await lockReportTarget(manager, report);
    }

    if (params.state !== undefined) {
      report.state = params.state;
    }
    if (params.comment !== undefined) {
      const reportComment = new ReportCommentEntity(report, currentUser, params.comment);
      await manager.save(reportComment);
    }
  }

  await manager.save(report);

  return [report];
});

export const DELETE = createDeleteOperation("Report", "Read", async ({ currentUser, manager, id }) => {
  const report = await manager.findOne(ReportEntity, id);
  if (report === undefined) {
    throw createError(404);
  }

  const isOwn = report.reporterId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  await manager.remove(report);

  return [];
});
