import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { UserEntity } from "../../database/entities";
import { setClearSiteData } from "../logout";

export const GET: OperationFunction = errorBoundary(async (_, res, next, currentUser) => {
  const user = await getManager().findOne(UserEntity, currentUser.id, {
    relations: ["account", "config", "summary"]
  });
  if (user === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Get the authenticated user",
  permission: "Write",
  tag: "user"
});

export const DELETE: OperationFunction = errorBoundary(async (_, res, next, currentUser) => {
  if (currentUser.permission === "Owner") {
    return next(createError(403));
  }

  await getManager().remove(currentUser);

  setClearSiteData(res);

  res.redirect("/");
});

DELETE.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Delete the authenticated user",
  permission: "Write",
  tag: "user"
});
