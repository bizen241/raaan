import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { SynonymEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: synonymId }: PathParams = req.params;

  const synonym = await getManager().findOne(SynonymEntity, synonymId);
  if (synonym === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, synonym);
});

GET.apiDoc = createOperationDoc({
  entityType: "Synonym",
  permission: "Admin",
  hasId: true
});
