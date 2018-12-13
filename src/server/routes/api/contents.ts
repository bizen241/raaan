import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Content } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult, skip, take } from "../../api/response";
import { ContentEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { page } = parseSearchParams<Content>("Content", req.query);

  const result = await getManager().findAndCount(ContentEntity, {
    relations: ["source"],
    skip: skip(page),
    take
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc<Content>({
  summary: "Search contents",
  tag: "contents",
  permission: "Guest"
});
