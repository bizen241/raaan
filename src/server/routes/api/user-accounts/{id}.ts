import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserAccountEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.user;
  const { id: userAccountId }: PathParams = req.params;

  const userAccount = await getManager().findOne(UserAccountEntity, userAccountId);
  if (userAccount === undefined) {
    return next(createError(404));
  }
  if (userAccount.user === undefined) {
    return next(createError(500));
  }
  if (userAccount.user.id !== currentUser.id) {
    return next(createError(403));
  }

  responseFindResult(res, userAccount);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserAccount",
  summary: "Get a user account",
  permission: "Write",
  hasId: true
});
