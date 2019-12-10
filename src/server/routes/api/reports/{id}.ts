import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Report } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { hasPermission } from "../../../api/security";
import { ReportEntity } from "../../../database/entities";
import { lockReportTarget } from "../../../services/reports";

export const PATCH: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { id: reportId }: PathParams = req.params;
  const params: Params<Report> = req.body;

  await getManager().transaction(async manager => {
    const report = await manager.findOne(ReportEntity, reportId);
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
        report.comment = params.comment;
      }
    }

    await manager.save(report);

    responseFindResult(req, res, report);
  });
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Report",
  permission: "Admin",
  hasId: true,
  hasBody: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: reportId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const report = await manager.findOne(ReportEntity, reportId);
    if (report === undefined) {
      return next(createError(404));
    }

    const isOwn = report.reporterId === currentUser.id;
    if (!isOwn) {
      return next(createError(403));
    }

    await manager.remove(report);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Report",
  permission: "Read",
  hasId: true
});
