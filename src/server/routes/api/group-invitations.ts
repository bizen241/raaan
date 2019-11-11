import { OperationFunction } from "express-openapi";
import { FindConditions, getManager } from "typeorm";
import { GroupInvitation } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { GroupInvitationEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, targetId, searchLimit, searchOffset } = parseQuery<GroupInvitation>("GroupInvitation", req.query);

  const where: FindConditions<GroupInvitationEntity> = {};
  if (groupId !== undefined) {
    where.group = {
      id: groupId
    };
  }
  if (targetId !== undefined) {
    where.target = {
      id: targetId
    };
  }

  const [groupInvitations, count] = await getManager().findAndCount(GroupInvitationEntity, {
    where,
    relations: ["group", "target", "target.summary"],
    take: searchLimit,
    skip: searchOffset
  });

  responseSearchResult(req, res, groupInvitations, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupInvitation",
  permission: "Read",
  hasQuery: true
});
