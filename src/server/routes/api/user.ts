import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { UserEntity } from "../../database/entities";
import { setClearSiteData } from "../logout";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const user = await getManager().findOne(UserEntity, req.user.id, {
    relations: ["config"]
  });
  if (user === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Get the authenticated user",
  permission: "Guest",
  tag: "user"
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.user;
  if (currentUser.permission === "Admin") {
    return next(createError(403));
  }

  await getManager().remove(currentUser);

  setClearSiteData(res);

  res.sendStatus(200);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Delete the authenticated user",
  permission: "Write",
  tag: "user"
});
