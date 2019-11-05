import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { GroupSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { GroupSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { searchLimit, searchOffset } = parseQuery<GroupSummary>("GroupSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(GroupSummaryEntity, "groupSummary")
    .leftJoinAndSelect("groupSummary.group", "group")
    .take(searchLimit)
    .skip(searchOffset);

  const [groups, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groups, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupSummary",
  permission: "Guest",
  hasQuery: true
});
