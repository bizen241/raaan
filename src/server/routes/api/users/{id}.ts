import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: userId }: PathParams = req.params;

  const user = await getManager().findOne(UserEntity, userId);
  if (user === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Get a user",
  permission: "Guest",
  hasId: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: userId }: PathParams = req.params;

  const user = await getManager().findOne(UserEntity, userId);
  if (user === undefined) {
    return next(createError(404));
  }
  if (user.permission === "Owner") {
    return next(createError(403));
  }

  await getManager().remove(user);

  responseFindResult(res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Delete a user",
  permission: "Admin",
  hasId: true
});
