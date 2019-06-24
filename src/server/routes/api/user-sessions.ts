import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { UserSession } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserSessionEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, limit, offset } = parseSearchParams<UserSession>("UserSession", req.query);

  if (userId !== currentUser.id) {
    return next(createError(403));
  }

  const where: FindConditions<UserSessionEntity> = {};

  if (userId !== undefined) {
    where.user = {
      id: userId
    };
  }

  const [userSessions, count] = await getManager().findAndCount(UserSessionEntity, {
    where,
    relations: ["user"],
    take: limit,
    skip: offset
  });

  const filteredUserSessions = userSessions.filter(userSession => userSession.sessionId !== req.sessionID);

  responseSearchResult(res, filteredUserSessions, count - 1);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserSession",
  summary: "Search user sessions",
  permission: "Write",
  hasQuery: true
});
