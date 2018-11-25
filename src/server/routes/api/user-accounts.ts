import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { UserAccount } from "../../../shared/api/entities";
import { createApiDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult, skip, take } from "../../api/response";
import { UserAccountEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;

  const { page, userId } = parseSearchParams<UserAccount>("UserAccount", req.query);

  if (userId !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  const where: FindConditions<UserAccountEntity> = {};

  if (userId !== undefined) {
    where.user = {
      id: userId
    };
  }

  const result = await getManager().findAndCount(UserAccountEntity, {
    where,
    relations: ["user"],
    skip: skip(page),
    take
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createApiDoc({
  summary: "Get user accounts",
  tag: "user-accounts",
  permission: "Read"
});
