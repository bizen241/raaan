import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { TagFollowEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("TagFollow", "Read", async ({ currentUser, manager, id }) => {
  const tagFollow = await manager.findOne(TagFollowEntity, id, {
    relations: ["target", "target.summary"],
  });
  if (tagFollow === undefined) {
    throw createError(404);
  }
  if (tagFollow.target === undefined || tagFollow.target.summary === undefined) {
    throw createError(500);
  }

  const isFollower = tagFollow.followerId === currentUser.id;
  if (!isFollower) {
    throw createError(403);
  }

  const targetSummary = tagFollow.target.summary;

  targetSummary.followerCount -= 1;
  await manager.save(targetSummary);

  await manager.remove(tagFollow);

  return [targetSummary];
});
