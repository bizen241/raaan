import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { TagEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { name, searchLimit, searchOffset } = parseQuery("Tag", req.query);

  const query = await getManager()
    .createQueryBuilder(TagEntity, "tag")
    .take(searchLimit)
    .skip(searchOffset);

  if (name !== undefined) {
    query.andWhere("tag.name = :name", { name });
  }

  const [tags, count] = await query.getManyAndCount();

  responseSearchResult(req, res, tags, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Tag",
  permission: "Read",
  hasQuery: true
});
