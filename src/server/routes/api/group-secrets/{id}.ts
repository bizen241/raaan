import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { GroupSecretEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: groupSecretId }: PathParams = req.params;

  const groupSecret = await getManager().findOne(GroupSecretEntity, groupSecretId, {
    relations: ["group"]
  });
  if (groupSecret === undefined) {
    return next(createError(404));
  }
  if (groupSecret.group === undefined) {
    return next(createError(500));
  }
  if (groupSecret.group.ownerId !== currentUser.id) {
    return next(createError(403));
  }

  responseFindResult(req, res, groupSecret);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupSecret",
  permission: "Read",
  hasId: true
});
