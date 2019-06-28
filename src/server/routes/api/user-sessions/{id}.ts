import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserSessionEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: userSessionId }: PathParams = req.params;

  const manager = getManager();

  const userSession = await manager.findOne(UserSessionEntity, userSessionId, {
    relations: ["user"]
  });
  if (userSession === undefined) {
    return next(createError(404));
  }
  if (userSession.userId !== currentUser.id) {
    return next(createError(403));
  }

  await manager.remove(userSession);

  responseFindResult(req, res, userSession);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "UserSession",
  summary: "Delete a user session",
  permission: "Write",
  hasId: true
});
