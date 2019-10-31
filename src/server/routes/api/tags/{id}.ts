import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Tag } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { hasPermission } from "../../../api/security";
import { TagEntity } from "../../../database/entities";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: tagId }: PathParams = req.params;
  const params: Params<Tag> = req.body;

  const manager = getManager();

  const tag = await manager.findOne(TagEntity, tagId);
  if (tag === undefined) {
    return next(createError(404));
  }

  if (!hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  if (params.description !== undefined) {
    tag.description = params.description;
  }

  await manager.save(tag);

  responseFindResult(req, res, tag);
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Tag",
  permission: "Admin",
  hasId: true,
  hasBody: true
});
