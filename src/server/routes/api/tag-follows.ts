import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { FindConditions, getManager } from "typeorm";
import { TagFollow } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { TagEntity, TagFollowEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { followerId, targetId, searchLimit, searchOffset } = parseQuery<TagFollow>("TagFollow", req.query);

  const where: FindConditions<TagFollowEntity> = {};
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

  const [tagFollows, count] = await getManager().findAndCount(TagFollowEntity, {
    where,
    relations: ["follower", "follower.summary", "target", "target.summary"],
    take: searchLimit,
    skip: searchOffset
  });

  responseSearchResult(req, res, tagFollows, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "TagFollow",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { targetId }: Params<TagFollow> = req.body;

  await getManager().transaction(async manager => {
    const target = await manager.findOne(TagEntity, targetId, {
      relations: ["summary"]
    });
    if (target === undefined) {
      return next(createError(404));
    }
    if (target.summary === undefined) {
      return next(createError(500));
    }

    const tagFollow = new TagFollowEntity(target, currentUser);
    await manager.save(tagFollow);

    target.summary.followerCount += 1;
    await manager.save(target.summary);

    responseFindResult(req, res, tagFollow, target.summary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "TagFollow",
  permission: "Read",
  hasBody: true
});
