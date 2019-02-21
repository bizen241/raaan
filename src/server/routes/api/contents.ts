import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Content } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult, skip, take } from "../../api/response";
import { ContentEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { page } = parseSearchParams<Content>("Content", req.query);

  const result = await getManager().findAndCount(ContentEntity, {
    relations: ["author", "latest", "tags"],
    skip: skip(page),
    take
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "Content",
  summary: "Search contents",
  permission: "Guest",
  hasQuery: true
});
