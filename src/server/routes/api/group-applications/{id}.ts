import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { GroupApplicationEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: groupApplicationId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const groupApplication = await manager.findOne(GroupApplicationEntity, groupApplicationId, {
      relations: ["group"]
    });
    if (groupApplication === undefined) {
      return next(createError(404));
    }
    if (groupApplication.group === undefined) {
      return next(createError(500));
    }

    const isOwn = groupApplication.applicantId === currentUser.id;
    const isOwner = groupApplication.group.ownerId === currentUser.id;
    if (!isOwn && !isOwner) {
      return next(createError(403));
    }

    await manager.remove(groupApplication);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "GroupApplication",
  permission: "Read",
  hasId: true
});
