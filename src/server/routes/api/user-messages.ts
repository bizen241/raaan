import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserMessage } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserMessageEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery<UserMessage>("UserMessage", req.query);

  const isOwnMessages = userId === currentUser.id;
  if (!isOwnMessages) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(UserMessageEntity, "userMessage")
    .leftJoinAndSelect("userMessage.user", "user")
    .take(searchLimit)
    .skip(searchOffset);

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  const [userMessages, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userMessages, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserMessage",
  permission: "Read",
  hasQuery: true
});
