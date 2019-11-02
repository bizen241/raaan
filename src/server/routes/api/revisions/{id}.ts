import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { RevisionEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: revisionId }: PathParams = req.params;

  const revision = await getManager().findOne(RevisionEntity, revisionId, {
    relations: ["summary"]
  });
  if (revision === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, revision);
});

GET.apiDoc = createOperationDoc({
  entityType: "Revision",
  permission: "Read",
  hasId: true
});
