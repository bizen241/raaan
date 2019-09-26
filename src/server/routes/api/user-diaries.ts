import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserDiary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserDiaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery<UserDiary>("UserDiary", req.query);

  const isOwnDiaries = userId === currentUser.id;
  if (!isOwnDiaries) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(UserDiaryEntity, "userDiary")
    .leftJoinAndSelect("userDiary.user", "user")
    .orderBy("userDiary.date", "DESC")
    .take(searchLimit)
    .skip(searchOffset);

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }

  const [userDiaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userDiaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserDiary",
  summary: "Search user diaries",
  permission: "Read",
  hasQuery: true
});
