import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { UserDiaryEntryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery("UserDiaryEntry", req.query);

  const isOwnDiaryEntries = userId === currentUser.id;
  if (!isOwnDiaryEntries) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(UserDiaryEntryEntity, "userDiaryEntry")
    .leftJoinAndSelect("userDiaryEntry.user", "user")
    .orderBy("userDiaryEntry.date", "DESC")
    .take(searchLimit)
    .skip(searchOffset);

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  const [userDiaryEntries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userDiaryEntries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserDiaryEntry",
  permission: "Read",
  hasQuery: true
});
