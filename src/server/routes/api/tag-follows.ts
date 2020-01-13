import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { TagEntity, TagFollowEntity } from "../../database/entities";

export const GET = createSearchOperation("TagFollow", "Read", async ({ manager, params }) => {
  const { followerId, targetId } = params;

  const query = manager
    .createQueryBuilder(TagFollowEntity, "tagFollow")
    .leftJoinAndSelect("tagFollow.follower", "follower")
    .leftJoinAndSelect("tagFollow.target", "target")
    .leftJoinAndMapOne("follower.summary", "follower.summary", "followerSummary")
    .leftJoinAndMapOne("target.summary", "target.summary", "targetSummary");

  if (followerId !== undefined) {
    query.andWhere("tagFollow.followerId = :followerId", { followerId });
  }
  if (targetId !== undefined) {
    query.andWhere("tagFollow.targetId = :targetId", { targetId });
  }

  return query;
});

export const POST = createPostOperation("TagFollow", "Read", async ({ currentUser, manager, params }) => {
  const { targetId } = params;

  const target = await manager.findOne(TagEntity, targetId, {
    relations: ["summary"]
  });
  if (target === undefined) {
    throw createError(404);
  }
  if (target.summary === undefined) {
    throw createError(500);
  }

  const tagFollow = new TagFollowEntity(target, currentUser);
  await manager.save(tagFollow);

  target.summary.followerCount += 1;
  await manager.save(target.summary);

  return [tagFollow, target.summary];
});
