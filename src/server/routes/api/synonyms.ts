import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Synonym } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { SynonymEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { searchLimit, searchOffset } = parseQuery("Synonym", req.query);

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

export const POST: OperationFunction = errorBoundary(async (req, res, next) => {
  const { name, target }: Params<Synonym> = req.body;
  if (name === undefined || target === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const synonym = new SynonymEntity(name, target);
    await manager.save(synonym);

    responseFindResult(req, res, synonym);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Synonym",
  permission: "Admin",
  hasBody: true
});
