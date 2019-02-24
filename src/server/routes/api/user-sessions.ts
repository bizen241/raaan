import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { UserSession } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserSessionEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;

  const { userId, userAgent, limit, offset } = parseSearchParams<UserSession>("UserSession", req.query);

  if (userId !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  const where: FindConditions<UserSessionEntity> = {};

  if (userId !== undefined) {
    where.user = {
      id: userId
    };
  }
  if (userAgent !== undefined) {
    where.userAgent = userAgent;
  }

  const result = await getManager().findAndCount(UserSessionEntity, {
    where,
    relations: ["user"],
    take: limit,
    skip: offset
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserSession",
  summary: "Search user sessions",
  permission: "Write",
  hasQuery: true
});
