import { OperationFunction } from "express-openapi";
import { FindConditions, getManager } from "typeorm";
import { User } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult, skip, take } from "../../api/response";
import { UserEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { page, name, permission } = parseSearchParams<User>("User", req.query);

  const where: FindConditions<UserEntity> = {};

  if (name !== undefined) {
    where.name = name;
  }
  if (permission !== undefined) {
    where.permission = permission;
  }

  const result = await getManager().findAndCount(UserEntity, {
    where,
    skip: skip(page),
    take
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Search users",
  permission: "Guest",
  hasQuery: true
});
