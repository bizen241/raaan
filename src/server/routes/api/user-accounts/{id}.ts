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
  if (userAccount.userId !== currentUser.id) {
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

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.user;
  const { id: userAccountId }: PathParams = req.params;

  const manager = getManager();

  const userAccount = await manager.findOne(UserAccountEntity, userAccountId, {
    relations: ["user"]
  });
  if (userAccount === undefined) {
    return next(createError(404));
  }
  if (userAccount.userId !== currentUser.id) {
    return next(createError(403));
  }

  const userAccounts = await manager.find(UserAccountEntity, {
    where: {
      user: {
        id: userAccount.userId
      }
    }
  });
  if (userAccounts.length < 2) {
    return next(createError(405));
  }

  await manager.remove(userAccount);

  responseFindResult(res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "UserAccount",
  summary: "Delete a user account",
  permission: "Write",
  hasId: true
});
