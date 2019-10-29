import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserConfig } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserConfigEntity } from "../../../database/entities";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: userConfigId }: PathParams = req.params;
  const params: Params<UserConfig> = req.body;

  const manager = getManager();

  const userConfig = await manager.findOne(UserConfigEntity, userConfigId);
  if (userConfig === undefined) {
    return next(createError(404));
  }

  const isOwn = userConfig.userId === currentUser.id;
  if (!isOwn) {
    return next(createError(403));
  }

  if (params.settings !== undefined) {
    userConfig.settings = params.settings;
  }

  await manager.save(userConfig);

  responseFindResult(req, res, userConfig);
});

PATCH.apiDoc = createOperationDoc({
  entityType: "UserConfig",
  permission: "Read",
  hasId: true,
  hasBody: true
});
