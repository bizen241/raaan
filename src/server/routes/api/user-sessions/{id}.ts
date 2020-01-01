import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { setClearSiteData } from "../../../auth";
import { UserSessionEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: userSessionId }: PathParams = req.params;

  const manager = getManager();

  const userSession = await getManager()
    .createQueryBuilder(UserSessionEntity, "userSession")
    .leftJoinAndSelect("userSession.user", "user")
    .where("userSession.id = :userSessionId", { userSessionId })
    .getOne();
  if (userSession === undefined) {
    return next(createError(404));
  }

  const isOwn = userSession.userId !== currentUser.id;
  if (isOwn) {
    return next(createError(403));
  }

  await manager.remove(userSession);

  if (userSession.sessionId === req.sessionID) {
    setClearSiteData(res);
  }

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "UserSession",
  permission: "Read",
  hasId: true
});
