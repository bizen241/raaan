import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserFollow } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { UserEntity, UserFollowEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { followerId, targetId, searchLimit, searchOffset } = parseQuery<UserFollow>("UserFollow", req.query);

  const isFollower = followerId === currentUser.id;
  if (!isFollower) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(UserFollowEntity, "userFollow")
    .leftJoinAndSelect("userFollow.follower", "follower")
    .leftJoinAndSelect("userFollow.target", "target")
    .take(searchLimit)
    .skip(searchOffset);

  if (followerId !== undefined) {
    query.andWhere("userFollow.followerId = :followerId", { followerId });
  }
  if (targetId !== undefined) {
    query.andWhere("userFollow.targetId = :targetId", { targetId });
  }

  const [userFollows, count] = await query.getManyAndCount();

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
