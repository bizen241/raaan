import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserSession } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserSessionEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery<UserSession>("UserSession", req.query);

  const isOwnSessions = userId === currentUser.id;
  if (!isOwnSessions) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(UserSessionEntity, "userSession")
    .leftJoinAndSelect("userSession.user", "user")
    .leftJoinAndSelect("user.summary", "summary")
    .take(searchLimit)
    .skip(searchOffset);

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  const [userSessions, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userSessions, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserSession",
  permission: "Read",
  hasQuery: true
});
