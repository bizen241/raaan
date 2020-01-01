import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { UserSessionEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery("UserSession", req.query);
  if (userId === undefined) {
    throw createError(400);
  }

  const isOwn = userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  const query = await getManager()
    .createQueryBuilder(UserSessionEntity, "userSession")
    .leftJoinAndSelect("userSession.user", "user")
    .leftJoinAndSelect("user.summary", "summary")
    .take(searchLimit)
    .skip(searchOffset);

  query.andWhere("user.id = :userId", { userId });

  const [userSessions, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userSessions, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserSession",
  permission: "Read",
  hasQuery: true
});
