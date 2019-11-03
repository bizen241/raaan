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
  permission: "Guest",
  hasId: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: synonymId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const synonym = await manager.findOne(SynonymEntity, synonymId);
    if (synonym === undefined) {
      return next(createError(404));
    }

    await manager.remove(synonym);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Synonym",
  permission: "Admin",
  hasId: true
});
