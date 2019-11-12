import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { GroupMemberEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: groupMemberId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const groupMember = await manager.findOne(GroupMemberEntity, groupMemberId, {
      relations: ["group"]
    });
    if (groupMember === undefined) {
      return next(createError(404));
    }
    if (groupMember.group === undefined) {
      return next(createError(500));
    }

    const isOwn = groupMember.userId === currentUser.id;
    const isOwner = groupMember.group.ownerId === currentUser.id;
    if (!isOwn && !isOwner) {
      return next(createError(403));
    }

    await manager.remove(groupMember);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "GroupInvitation",
  permission: "Read",
  hasId: true
});
