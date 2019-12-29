import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Report } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ReportEntity } from "../../database/entities";
import { getDefendant } from "../../services/reports";

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
