import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { GroupInvitationEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: groupInvitationId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const groupInvitation = await manager.findOne(GroupInvitationEntity, groupInvitationId, {
      relations: ["group"]
    });
    if (groupInvitation === undefined) {
      return next(createError(404));
    }
    if (groupInvitation.group === undefined) {
      return next(createError(500));
    }

    const isOwn = groupInvitation.targetId === currentUser.id;
    const isOwner = groupInvitation.group.ownerId === currentUser.id;
    if (!isOwn && !isOwner) {
      return next(createError(403));
    }

    await manager.remove(groupInvitation);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "GroupInvitation",
  permission: "Read",
  hasId: true
});
