import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { setClearSiteData } from "../logout";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  responseFindResult(res, req.session.user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  summary: "Get the authenticated user",
  permission: "Guest",
  tag: "user"
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
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
