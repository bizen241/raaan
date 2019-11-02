import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { UserFollow } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { UserEntity, UserFollowEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { followerId, targetId, searchLimit, searchOffset } = parseQuery<UserFollow>("UserFollow", req.query);

  const where: FindConditions<UserFollowEntity> = {};
  if (followerId !== undefined) {
    where.follower = {
      id: followerId
    };
  }
  if (targetId !== undefined) {
    where.target = {
      id: targetId
    };
  }

  const [userFollows, count] = await getManager().findAndCount(UserFollowEntity, {
    where,
    relations: ["follower", "follower.summary", "target", "target.summary"],
    take: searchLimit,
    skip: searchOffset
  });

  responseSearchResult(req, res, userFollows, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "UserFollow",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { targetId }: Params<UserFollow> = req.body;

  await getManager().transaction(async manager => {
    const target = await manager.findOne(UserEntity, targetId, {
      relations: ["summary"]
    });
    if (target === undefined) {
      return next(createError(404));
    }
    if (target.summary === undefined) {
      return next(createError(500));
    }

    const userFollow = new UserFollowEntity(target, currentUser);
    await manager.save(userFollow);

    target.summary.followerCount += 1;
    await manager.save(target.summary);

    responseFindResult(req, res, userFollow, target.summary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "UserFollow",
  permission: "Read",
  hasBody: true
});
