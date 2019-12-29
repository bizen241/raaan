import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import { ObjectionSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { objectorId, targetType, targetId, searchLimit, searchOffset } = parseQuery("ObjectionSummary", req.query);

  const isObjector = objectorId === currentUser.id;
  if (!isObjector && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = getManager()
    .createQueryBuilder(ObjectionSummaryEntity, "objectionSummary")
    .leftJoinAndSelect("objectionSummary.parent", "parent")
    .take(searchLimit)
    .skip(searchOffset);

  if (objectorId !== undefined) {
    query.andWhere("parent.objectorId = :objectorId", { objectorId });
  }
  if (targetType !== undefined) {
    query.andWhere("parent.targetType", { targetType });

    if (targetId !== undefined) {
      query.andWhere("parent.targetId = :targetId", { targetId });
    }
  }

  const [objections, count] = await query.getManyAndCount();

  responseSearchResult(req, res, objections, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ObjectionSummary",
  permission: "Read",
  hasQuery: true
});
