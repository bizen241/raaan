import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Report } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import { ReportEntity } from "../../database/entities";
import { getDefendant } from "../../services/reports";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { reporterId, defendantId, targetType, targetId, searchLimit, searchOffset } = parseQuery("Report", req.query);

  const isReporter = reporterId === currentUser.id;
  if (!isReporter && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = getManager()
    .createQueryBuilder(ReportEntity, "report")
    .take(searchLimit)
    .skip(searchOffset);

  if (reporterId !== undefined) {
    query.andWhere("report.reporterId = :reporterId", { reporterId });
  }
  if (defendantId !== undefined) {
    query.andWhere("report.defendantId = :defendantId", { defendantId });
  }
  if (targetType !== undefined) {
    query.andWhere("report.targetType", { targetType });

    if (targetId !== undefined) {
      query.andWhere("report.targetId = :targetId", { targetId });
    }
  }

  const [reports, count] = await query.getManyAndCount();

  responseSearchResult(req, res, reports, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Report",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { targetType, targetId, reason, description = "" }: Params<Report> = req.body;
  if (targetType === undefined || targetId === undefined || reason === undefined) {
    throw createError(400);
  }

  await getManager().transaction(async manager => {
    const defendant = await getDefendant(manager, targetType, targetId);
    const report = new ReportEntity(currentUser, defendant, reason, description);

    report.targetType = targetType;
    report.targetId = targetId;

    await manager.save(report);

    responseFindResult(req, res, report);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Report",
  permission: "Write",
  hasBody: true
});
