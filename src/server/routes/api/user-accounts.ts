import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserAccount } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserAccountEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery<UserAccount>("UserAccount", req.query);

  const isOwnAccounts = userId === currentUser.id;
  if (!isOwnAccounts) {
    return next(createError(403));
  }

  const query = getManager()
    .createQueryBuilder(UserAccountEntity, "userAccount")
    .leftJoinAndSelect("userAccount.user", "user")
    .take(searchLimit)
    .skip(searchOffset);

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  const [userAccounts, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userAccounts, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserAccount",
  permission: "Read",
  hasQuery: true
});
