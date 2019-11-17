import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Contest } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { ContestEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, searchLimit, searchOffset } = parseQuery<Contest>("Contest", req.query);

  const manager = getManager();

  const query = manager
    .createQueryBuilder(ContestEntity, "contest")
    .leftJoinAndSelect("contest.group", "group")
    .leftJoinAndSelect("contest.exercise", "exercise")
    .take(searchLimit)
    .skip(searchOffset);

  if (groupId !== undefined) {
    query.andWhere("contest.groupId = :groupId", { groupId });
  }

  const [contests, count] = await query.getManyAndCount();

  responseSearchResult(req, res, contests, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Contest",
  permission: "Read",
  hasQuery: true
});
