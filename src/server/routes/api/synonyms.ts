import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Synonym } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { SynonymEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { searchLimit, searchOffset } = parseQuery<Synonym>("Synonym", req.query);

  const query = await getManager()
    .createQueryBuilder(SynonymEntity, "synonym")
    .take(searchLimit)
    .skip(searchOffset);

  const [synonyms, count] = await query.getManyAndCount();

  responseSearchResult(req, res, synonyms, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Synonym",
  permission: "Guest",
  hasQuery: true
});
