import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { UserFollowEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("UserFollow", "Read", async ({ currentUser, manager, id }) => {
  const userFollow = await manager.findOne(UserFollowEntity, id, {
    relations: ["target", "target.summary"],
  });
  if (userFollow === undefined) {
    throw createError(404);
  }
  if (userFollow.target === undefined || userFollow.target.summary === undefined) {
    throw createError(500);
  }

  const isFollower = userFollow.followerId === currentUser.id;
  if (!isFollower) {
    throw createError(403);
  }

  const targetSummary = userFollow.target.summary;

  targetSummary.followerCount -= 1;
  await manager.save(targetSummary);

  await manager.remove(userFollow);

  return [targetSummary];
});
