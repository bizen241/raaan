import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { GroupInvitation } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { GroupEntity, GroupInvitationEntity, UserEntity, UserFollowEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, targetId, ownerId, searchLimit, searchOffset } = parseQuery<GroupInvitation>(
    "GroupInvitation",
    req.query
  );

  const query = getManager()
    .createQueryBuilder(GroupInvitationEntity, "groupInvitation")
    .leftJoinAndSelect("groupInvitation.group", "group")
    .leftJoinAndSelect("groupInvitation.target", "target")
    .leftJoinAndMapOne("group.summary", "group.summary", "groupSummary")
    .leftJoinAndMapOne("target.summary", "target.summary", "targetSummary")
    .take(searchLimit)
    .skip(searchOffset);

  if (groupId !== undefined) {
    query.andWhere("groupInvitation.groupId = :groupId", { groupId });
  }
  if (targetId !== undefined) {
    query.andWhere("groupInvitation.targetId = :targetId", { targetId });
  }
  if (ownerId !== undefined) {
    query.andWhere("group.ownerId = :ownerId", { ownerId });
  }

  const [groupInvitations, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groupInvitations, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "GroupInvitation",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { groupId, targetId }: Params<GroupInvitation> = req.body;

  await getManager().transaction(async manager => {
    const group = await manager.findOne(GroupEntity, groupId);
    if (group === undefined) {
      return next(createError(404));
    }

    const target = await manager.findOne(UserEntity, targetId, {
      relations: ["summary"]
    });
    if (target === undefined) {
      return next(createError(404));
    }
    if (target.summary === undefined) {
      return next(createError(500));
    }

    const userFollow = await manager.findOne(UserFollowEntity, {
      target: {
        id: currentUser.id
      },
      follower: {
        id: targetId
      }
    });
    if (userFollow === undefined) {
      return next(createError(403));
    }

    const groupInvitation = new GroupInvitationEntity(group, target);
    await manager.save(groupInvitation);

    responseFindResult(req, res, groupInvitation, target.summary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "GroupInvitation",
  permission: "Write",
  hasBody: true
});
