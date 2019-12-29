import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Objection } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ObjectionEntity } from "../../database/entities";
import { checkObjectionTarget } from "../../services/objections";

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
