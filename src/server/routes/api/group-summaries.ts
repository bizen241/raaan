import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { GroupSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { ownerId, searchLimit, searchOffset } = parseQuery("GroupSummary", req.query);

  const query = getManager()
    .createQueryBuilder(GroupSummaryEntity, "groupSummary")
    .leftJoinAndSelect("groupSummary.group", "group")
    .take(searchLimit)
    .skip(searchOffset);

  if (ownerId !== undefined) {
    query.andWhere("group.ownerId = :ownerId", { ownerId });
  }

  const [groups, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groups, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupSummary",
  permission: "Guest",
  hasQuery: true
});
