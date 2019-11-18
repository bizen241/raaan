import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ContestEntity, GroupMemberEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: contestId }: PathParams = req.params;

  const manager = getManager();

  const contest = await manager.findOne(ContestEntity, contestId);
  if (contest === undefined) {
    return next(createError(404));
  }

  const groupMember = await manager.findOne(GroupMemberEntity, {
    group: {
      id: contest.groupId
    },
    user: {
      id: currentUser.id
    }
  });
  if (groupMember === undefined || groupMember.permission === "read") {
    return next(createError(403));
  }

  await manager.remove(contest);

  responseFindResult(req, res);
});

DELETE.apiDoc = createOperationDoc({
  entityType: "Contest",
  permission: "Write",
  hasId: true
});
