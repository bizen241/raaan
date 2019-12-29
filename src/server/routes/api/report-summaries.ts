import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import { ReportSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { reporterId, defendantId, targetType, targetId, searchLimit, searchOffset } = parseQuery(
    "ReportSummary",
    req.query
  );

  const isReporter = reporterId === currentUser.id;
  if (!isReporter && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = getManager()
    .createQueryBuilder(ReportSummaryEntity, "reportSummary")
    .leftJoinAndSelect("reportSummary.parent", "parent")
    .take(searchLimit)
    .skip(searchOffset);

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

  const [reportSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, reportSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ReportSummary",
  permission: "Read",
  hasQuery: true
});
