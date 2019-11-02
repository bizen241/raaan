import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { GroupEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: groupId }: PathParams = req.params;

  const group = await getManager().findOne(GroupEntity, groupId, {
    relations: ["owner"]
  });
  if (group === undefined) {
    return next(createError(404));
  }

  responseFindResult(req, res, group);
});

GET.apiDoc = createOperationDoc({
  entityType: "Group",
  permission: "Read",
  hasId: true
});
