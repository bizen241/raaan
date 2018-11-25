import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createApiDoc, errorBoundary } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserEntity } from "../../../database/entities";

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

GET.apiDoc = createApiDoc({
  summary: "Get an user",
  tag: "users",
  permission: "Read"
});
