import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserSessionEntity } from "../../../database/entities";

export interface PathParams {
  "user-session": string;
}

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;

  const { "user-session": userSessionId }: PathParams = req.params;

  const result = await getManager().findOne(UserSessionEntity, userSessionId, {
    relations: ["user"]
  });
  if (result === undefined) {
    return next(createError(404));
  }
  if (result.user.id !== currentUser.id && currentUser.permission !== "Admin") {
    next(createError(403));

    return;
  }

  responseFindResult(res, result);
});

GET.apiDoc = createOperationDoc({
  summary: "Get a user session",
  tag: "user-sessions",
  permission: "Read"
});
