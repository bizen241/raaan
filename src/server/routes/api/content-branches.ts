import { OperationFunction } from "express-openapi";
import { FindConditions, getManager } from "typeorm";
import { ContentBranch } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult, skip, take } from "../../api/response";
import { ContentBranchEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { page, lang } = parseSearchParams<ContentBranch>("ContentBranch", req.query);

  const where: FindConditions<ContentBranchEntity> = {};

  if (lang !== undefined) {
    where.lang = lang;
  }

  const result = await getManager().findAndCount(ContentBranchEntity, {
    where,
    relations: ["content", "latest"],
    skip: skip(page),
    take
  });

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc<ContentBranch>({
  summary: "Search contents",
  tag: "contents",
  permission: "Guest",
  query: {
    lang: null
  }
});
