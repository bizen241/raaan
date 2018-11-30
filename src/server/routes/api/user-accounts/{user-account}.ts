import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserAccountEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;

  const { id: userAccountId }: PathParams = req.params;

  const result = await getManager().findOne(UserAccountEntity, userAccountId, {
    relations: ["user"]
  });
  if (result === undefined) {
    return next(createError(404));
  }
  if (result.user.id !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  responseFindResult(res, result);
});

GET.apiDoc = createOperationDoc({
  summary: "Get a user account",
  tag: "user-accounts",
  permission: "Read",
  path: ["id"]
});
