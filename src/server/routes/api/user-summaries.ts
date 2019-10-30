import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { UserSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { UserSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { searchLimit, searchOffset } = parseQuery<UserSummary>("UserSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(UserSummaryEntity, "exerciseSummary")
    .leftJoinAndSelect("exerciseSummary.user", "user")
    .take(searchLimit)
    .skip(searchOffset);

  query.andWhere("user.permission <> :permission", { permission: "Guest" });

  const [userSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, userSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserSummary",
  permission: "Guest",
  hasQuery: true
});
