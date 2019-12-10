import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Objection } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { hasPermission } from "../../../api/security";
import { ObjectionEntity } from "../../../database/entities";
import { unlockObjectionTarget } from "../../../services/objections";

export const PATCH: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { id: reportId }: PathParams = req.params;
  const params: Params<Objection> = req.body;

  await getManager().transaction(async manager => {
    const report = await manager.findOne(ObjectionEntity, reportId);
    if (report === undefined) {
      throw createError(404);
    }

    const isObjector = report.objectorId === currentUser.id;
    if (!isObjector && !hasPermission(currentUser, "Admin")) {
      throw createError(403);
    }

    if (isObjector) {
      if (params.description !== undefined) {
        report.description = params.description;
      }
    } else {
      if (report.state !== "accepted" && params.state === "accepted") {
        await unlockObjectionTarget(manager, report);
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
  entityType: "Objection",
  permission: "Admin",
  hasId: true,
  hasBody: true
});
