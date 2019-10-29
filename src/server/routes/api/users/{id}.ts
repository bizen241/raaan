import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: userId }: PathParams = req.params;

  const user = await getManager().findOne(UserEntity, userId, {
    relations: ["summary"]
  });
  if (user === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, user);
});

GET.apiDoc = createOperationDoc({
  entityType: "User",
  permission: "Guest",
  hasId: true
});
