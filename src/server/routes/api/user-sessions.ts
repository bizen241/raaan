import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { UserSession } from "../../../shared/api/entities";
import { createApiDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult, skip, take } from "../../api/response";
import { UserSessionEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;

  const { page, userId, userAgent } = parseSearchParams<UserSession>("UserSession", req.query);

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
    skip: skip(page),
    take
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createApiDoc({
  summary: "Get user sessions",
  tag: "user-sessions",
  permission: "Read"
});
