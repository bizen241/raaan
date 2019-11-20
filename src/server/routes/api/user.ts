import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { setClearSiteData } from "../../auth";
import { UserEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const user = await getManager().findOne(UserEntity, currentUser.id, {
    relations: ["config", "summary"]
  });
  if (user === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  permission: "Write",
  tag: "user"
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  if (currentUser.permission === "Owner") {
    return next(createError(403));
  }

  await getManager().remove(currentUser);

  setClearSiteData(res);

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "User",
  permission: "Read",
  tag: "user"
});
