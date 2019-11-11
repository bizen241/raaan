import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { GroupMember } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { GroupEntity, GroupInvitationEntity, GroupMemberEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, userId, searchLimit, searchOffset } = parseQuery<GroupMember>("GroupMember", req.query);

  const query = await getManager()
    .createQueryBuilder(GroupMemberEntity, "groupMember")
    .leftJoinAndSelect("groupMember.group", "group")
    .leftJoinAndSelect("group.summary", "summary")
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

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { groupId }: Params<GroupMember> = req.body;
  if (groupId === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const group = await manager.findOne(GroupEntity, groupId);
    if (group === undefined) {
      return next(createError(404));
    }

    const groupInvitation = await manager.findOne(GroupInvitationEntity, {
      group: {
        id: groupId
      },
      target: {
        id: currentUser.id
      }
    });
    if (groupInvitation === undefined) {
      return next(createError(403));
    }

    await manager.remove(groupInvitation);

    const groupMember = new GroupMemberEntity(group, currentUser);
    await manager.save(groupMember);

    responseFindResult(req, res, groupMember);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "GroupMember",
  permission: "Read",
  hasBody: true
});
