import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: userId }: PathParams = req.params;

  const loadedUser = await getManager().findOne(UserEntity, userId);
  if (loadedUser === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, loadedUser);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Get a user",
  permission: "Guest",
  hasId: true
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  if (currentUser.permission !== "Owner" && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  const { id: userId }: PathParams = req.params;

  const loadedUser = await getManager().findOne(UserEntity, userId);
  if (loadedUser === undefined) {
    return next(createError(404));
  }
  if (loadedUser.permission === "Owner" || loadedUser.permission === "Admin") {
    return next(createError(403));
  }

  await getManager().remove(loadedUser);

  responseFindResult(res, loadedUser);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Delete a user",
  permission: "Admin",
  hasId: true
});
