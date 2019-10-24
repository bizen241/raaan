import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { TagFollow } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { TagEntity, TagFollowEntity } from "../../database/entities";

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
  summary: "Follow a tag",
  permission: "Read",
  hasBody: true
});
