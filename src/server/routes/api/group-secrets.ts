import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { GroupSecret } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { GroupSecretEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { groupId, value, searchLimit, searchOffset } = parseQuery<GroupSecret>("GroupSecret", req.query);
  if (groupId === undefined || value === undefined) {
    return next(createError(400));
  }

  const query = getManager()
    .createQueryBuilder(GroupSecretEntity, "groupSecret")
    .leftJoinAndSelect("groupSecret.group", "group")
    .take(searchLimit)
    .skip(searchOffset);

  query.andWhere("groupSecret.groupId = :groupId", { groupId });
  query.andWhere("groupSecret.value = :value", { value });

  const [groupSecrets, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groupSecrets, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupSecret",
  permission: "Read",
  hasQuery: true
});
