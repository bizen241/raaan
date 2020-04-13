import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { UserEntity, UserFollowEntity } from "../../database/entities";

export const GET = createSearchOperation("UserFollow", "Read", async ({ manager, params }) => {
  const { followerId, targetId } = params;

  const query = manager
    .createQueryBuilder(UserFollowEntity, "userFollow")
    .leftJoinAndSelect("userFollow.follower", "follower")
    .leftJoinAndSelect("userFollow.target", "target")
    .leftJoinAndMapOne("follower.summary", "follower.summary", "followerSummary")
    .leftJoinAndMapOne("target.summary", "target.summary", "targetSummary");

  if (followerId !== undefined) {
    query.andWhere("userFollow.followerId = :followerId", { followerId });
  }
  if (targetId !== undefined) {
    query.andWhere("userFollow.targetId = :targetId", { targetId });
  }

  return query;
});

export const POST = createPostOperation("UserFollow", "Read", async ({ currentUser, manager, params }) => {
  const { targetId } = params;
  if (targetId === undefined) {
    throw createError(400);
  }

  const target = await manager.findOne(UserEntity, targetId, {
    relations: ["summary"],
  });
  if (target === undefined) {
    throw createError(404);
  }
  if (target.summary === undefined) {
    throw createError(500);
  }

  const userFollow = new UserFollowEntity(target, currentUser);
  await manager.save(userFollow);

  const targetSummary = target.summary;

  targetSummary.followerCount += 1;
  await manager.save(targetSummary);

  return [userFollow, targetSummary];
});
