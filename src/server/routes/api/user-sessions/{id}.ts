import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserSessionEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  const { id: userSessionId }: PathParams = req.params;

  const loadedUserSession = await getManager().findOne(UserSessionEntity, userSessionId, {
    relations: ["user"]
  });
  if (loadedUserSession === undefined) {
    return next(createError(404));
  }
  if (loadedUserSession.user.id !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  responseFindResult(res, loadedUserSession);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserSession",
  summary: "Get a user session",
  permission: "Write",
  hasId: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  const { id: userSessionId }: PathParams = req.params;

  const manager = getManager();

  const targetUserSession = await manager.findOne(UserSessionEntity, userSessionId, {
    relations: ["user"]
  });
  if (targetUserSession === undefined) {
    return next(createError(404));
  }
  if (targetUserSession.user.id !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  await manager.remove(targetUserSession);

  responseFindResult(res, targetUserSession);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "UserSession",
  summary: "Delete a user session",
  permission: "Write",
  hasId: true
});
