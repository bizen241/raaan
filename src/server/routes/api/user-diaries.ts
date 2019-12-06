import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { UserDiaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { userId, searchLimit, searchOffset } = parseQuery("UserDiary", req.query);

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
  permission: "Read",
  hasQuery: true
});
