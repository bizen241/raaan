import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { GroupMember } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { GroupMemberEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, userId, searchLimit, searchOffset } = parseQuery<GroupMember>("GroupMember", req.query);

  const query = await getManager()
    .createQueryBuilder(GroupMemberEntity, "groupMember")
    .leftJoinAndSelect("groupMember.group", "group")
    .leftJoinAndSelect("groupMember.user", "user")
    .take(searchLimit)
    .skip(searchOffset);

  if (groupId !== undefined) {
    query.andWhere("groupMember.groupId = :groupId", { groupId });
  }
  if (userId !== undefined) {
    query.andWhere("groupMember.userId = :userId", { userId });
  }

  const [groupMembers, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groupMembers, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupMember",
  permission: "Read",
  hasQuery: true
});
