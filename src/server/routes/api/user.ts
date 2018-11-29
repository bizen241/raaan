import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { deleteUser } from "./users/{user}";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  responseFindResult(res, req.session.user);
});

GET.apiDoc = createOperationDoc({
  summary: "Get the authenticated user",
  tag: "user",
  permission: "Guest"
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  if (currentUser.permission === "Admin") {
    return next(createError(403));
  }

  await deleteUser(currentUser);

  res.redirect("/logout");
});

DELETE.apiDoc = createOperationDoc({
  summary: "Delete the authenticated user",
  tag: "user",
  permission: "Read"
});
