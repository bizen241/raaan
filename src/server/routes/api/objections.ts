import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Objection } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import { ObjectionEntity } from "../../database/entities";
import { checkObjectionTarget } from "../../services/objections";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { objectorId, targetType, targetId, searchLimit, searchOffset } = parseQuery("Objection", req.query);

  const isObjector = objectorId === currentUser.id;
  if (!isObjector && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = getManager()
    .createQueryBuilder(ObjectionEntity, "objection")
    .take(searchLimit)
    .skip(searchOffset);

  if (objectorId !== undefined) {
    query.andWhere("objection.objectorId = :objectorId", { objectorId });
  }
  if (targetType !== undefined) {
    query.andWhere("objection.targetType", { targetType });

    if (targetId !== undefined) {
      query.andWhere("objection.targetId = :targetId", { targetId });
    }
  }

  const [objections, count] = await query.getManyAndCount();

  responseSearchResult(req, res, objections, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Objection",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { targetType, targetId, description = "" }: Params<Objection> = req.body;
  if (targetType === undefined || targetId === undefined) {
    throw createError(400);
  }

  await getManager().transaction(async manager => {
    await checkObjectionTarget(manager, currentUser, targetType, targetId);

    const objection = new ObjectionEntity(currentUser, description);

    objection.targetType = targetType;
    objection.targetId = targetId;

    await manager.save(objection);

    responseFindResult(req, res, objection);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Objection",
  permission: "Write",
  hasBody: true
});
