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
  const { id: objectionId }: PathParams = req.params;
  const params: Params<Objection> = req.body;

  await getManager().transaction(async manager => {
    const objection = await manager.findOne(ObjectionEntity, objectionId);
    if (objection === undefined) {
      throw createError(404);
    }

    const isObjector = objection.objectorId === currentUser.id;
    if (!isObjector && !hasPermission(currentUser, "Admin")) {
      throw createError(403);
    }

    if (isObjector) {
      if (params.description !== undefined) {
        objection.description = params.description;
      }
    } else {
      if (objection.state !== "accepted" && params.state === "accepted") {
        await unlockObjectionTarget(manager, objection);
      }

      if (params.state !== undefined) {
        objection.state = params.state;
      }
      if (params.comment !== undefined) {
        objection.comment = params.comment;
      }
    }

    await manager.save(objection);

    responseFindResult(req, res, objection);
  });
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Objection",
  permission: "Admin",
  hasId: true,
  hasBody: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: objectionId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const objection = await manager.findOne(ObjectionEntity, objectionId);
    if (objection === undefined) {
      return next(createError(404));
    }

    const isOwn = objection.objectorId === currentUser.id;
    if (!isOwn) {
      return next(createError(403));
    }

    await manager.remove(objection);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Objection",
  permission: "Read",
  hasId: true
});
