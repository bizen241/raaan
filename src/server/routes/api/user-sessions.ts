import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserSession } from "../../../shared/api/entities";
import { createApiDoc } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult, skip, take } from "../../api/response";
import { UserSessionEntity } from "../../database/entities";

export const GET: OperationFunction = async (req, res) => {
  const { page } = parseSearchParams<UserSession>("UserSession", req.query);

  const [userSessions, count] = await getManager()
    .findAndCount(UserSessionEntity, {
      where: {},
      relations: ["user"],
      skip: skip(page),
      take
    })
    .catch(() => {
      throw createError(500);
    });

  responseSearchResult(res, userSessions, count);
};

GET.apiDoc = createApiDoc({
  summary: "Get user sessions",
  tag: "user-sessions",
  permission: "Guest"
});
