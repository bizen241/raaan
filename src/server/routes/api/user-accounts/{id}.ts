import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserAccountEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  const { id: userAccountId }: PathParams = req.params;

  const loadedUserAccount = await getManager().findOne(UserAccountEntity, userAccountId, {
    relations: ["user"]
  });
  if (loadedUserAccount === undefined) {
    return next(createError(404));
  }
  if (loadedUserAccount.user.id !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  responseFindResult(res, loadedUserAccount);
});

GET.apiDoc = createOperationDoc({
  summary: "Get a user account",
  tag: "user-accounts",
  permission: "Write",
  path: ["id"]
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  const { id: userAccountId }: PathParams = req.params;

  const manager = getManager();

  const targetUserAccount = await manager.findOne(UserAccountEntity, userAccountId, {
    relations: ["user"]
  });
  if (targetUserAccount === undefined) {
    return next(createError(404));
  }
  if (targetUserAccount.user.id !== currentUser.id && currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  const loadedUserAccounts = await manager.find(UserAccountEntity, {
    where: {
      user: {
        id: targetUserAccount.user.id
      }
    }
  });
  if (loadedUserAccounts.length < 2) {
    return next(createError(405));
  }

  await manager.remove(targetUserAccount);

  responseFindResult(res, targetUserAccount);
});

DELETE.apiDoc = createOperationDoc({
  summary: "Delete a user account",
  tag: "user-accounts",
  permission: "Write",
  path: ["id"]
});
