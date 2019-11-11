import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { GroupInvitation } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { GroupEntity, GroupInvitationEntity, UserEntity, UserFollowEntity } from "../../database/entities";

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
