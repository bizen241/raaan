import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserFollowEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: userFollowId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const userFollow = await manager.findOne(UserFollowEntity, userFollowId, {
      relations: ["target", "target.summary"]
    });
    if (userFollow === undefined) {
      return next(createError(404));
    }
    if (userFollow.target === undefined || userFollow.target.summary === undefined) {
      return next(createError(500));
    }

    const isFollower = userFollow.followerId === currentUser.id;
    if (!isFollower) {
      return next(createError(403));
    }

    userFollow.target.summary.followerCount -= 1;
    await manager.save(userFollow.target.summary);

    await manager.remove(userFollow);

    responseFindResult(req, res, userFollow.target.summary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "UserFollow",
  summary: "Unfollow a user",
  permission: "Read",
  hasId: true
});
