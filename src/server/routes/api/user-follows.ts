import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserFollow } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { UserEntity, UserFollowEntity } from "../../database/entities";

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
  summary: "Follow a user",
  permission: "Read",
  hasBody: true
});
