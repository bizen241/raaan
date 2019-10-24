import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { TagFollowEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: tagFollowId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const tagFollow = await manager.findOne(TagFollowEntity, tagFollowId, {
      relations: ["target", "target.summary"]
    });
    if (tagFollow === undefined) {
      return next(createError(404));
    }
    if (tagFollow.target === undefined || tagFollow.target.summary === undefined) {
      return next(createError(500));
    }

    const isFollower = tagFollow.followerId === currentUser.id;
    if (!isFollower) {
      return next(createError(403));
    }

    tagFollow.target.summary.followerCount -= 1;
    await manager.save(tagFollow.target.summary);

    await manager.remove(tagFollow);

    responseFindResult(req, res, tagFollow.target.summary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "TagFollow",
  summary: "Unfollow a tag",
  permission: "Read",
  hasId: true
});
