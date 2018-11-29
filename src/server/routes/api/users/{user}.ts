import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserAccountEntity, UserEntity, UserSessionEntity } from "../../../database/entities";

export interface PathParams {
  user: string;
}

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { user: userId }: PathParams = req.params;

  const result = await getManager().findOne(UserEntity, userId);
  if (result === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, result);
});

GET.apiDoc = createOperationDoc({
  summary: "Get an user",
  tag: "users",
  permission: "Read"
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  if (currentUser.permission === "Admin") {
    return next(createError(403));
  }

  const manager = getManager();

  await manager.delete(UserAccountEntity, {
    user: {
      id: currentUser.id
    }
  });
  await manager.delete(UserSessionEntity, {
    user: {
      id: currentUser.id
    }
  });

  currentUser.name = "Ghost";
  currentUser.permission = "Ghost";

  await manager.save(currentUser);

  res.redirect("/logout");
});

DELETE.apiDoc = createOperationDoc({
  summary: "Delete an user",
  tag: "users",
  permission: "Read"
});
