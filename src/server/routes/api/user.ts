import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { setClearSiteData } from "../../auth";
import { UserEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const userId = currentUser.id;

  const user = await getManager()
    .createQueryBuilder(UserEntity, "user")
    .leftJoinAndSelect("user.account", "account")
    .leftJoinAndSelect("user.config", "config")
    .leftJoinAndSelect("user.summary", "summary")
    .where("user.id = :userId", { userId })
    .getOne();
  if (user === undefined) {
    throw createError(500);
  }

  responseFindResult(req, res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  permission: "Read",
  tag: "user"
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  if (currentUser.permission === "Owner") {
    throw createError(403);
  }

  await getManager().transaction(async manager => {
    await manager.remove(currentUser);

    setClearSiteData(res);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "User",
  permission: "Read",
  tag: "user"
});
