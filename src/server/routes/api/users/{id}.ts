import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserAccountEntity, UserEntity, UserSessionEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: userId }: PathParams = req.params;

  const loadedUser = await getManager().findOne(UserEntity, userId);
  if (loadedUser === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, loadedUser);
});

GET.apiDoc = createOperationDoc({
  summary: "Get a user",
  tag: "users",
  permission: "Write",
  path: ["id"]
});

export const deleteUser = async (user: UserEntity) => {
  const manager = getManager();

  await manager.delete(UserAccountEntity, {
    user: {
      id: user.id
    }
  });
  await manager.delete(UserSessionEntity, {
    user: {
      id: user.id
    }
  });

  user.name = "Ghost";
  user.permission = "Ghost";

  await manager.save(user);
};

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const currentUser = req.session.user;
  if (currentUser.permission !== "Admin") {
    return next(createError(403));
  }

  const { id: userId }: PathParams = req.params;

  const loadedUser = await getManager().findOne(UserEntity, userId);
  if (loadedUser === undefined) {
    return next(createError(404));
  }
  if (loadedUser.id === currentUser.id) {
    return next(createError(403));
  }

  await deleteUser(loadedUser);

  responseFindResult(res, loadedUser);
});

DELETE.apiDoc = createOperationDoc({
  summary: "Delete a user",
  tag: "users",
  permission: "Admin",
  path: ["id"]
});
