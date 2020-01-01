import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { id: userId }: PathParams = req.params;

  const user = await getManager()
    .createQueryBuilder(UserEntity, "user")
    .leftJoinAndSelect("user.summary", "summary")
    .where("user.id = :userId", { userId })
    .getOne();
  if (user === undefined) {
    throw createError(404);
  }

  responseFindResult(req, res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  permission: "Guest",
  hasId: true
});
