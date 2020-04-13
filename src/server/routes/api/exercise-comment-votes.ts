import createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { ExerciseCommentEntity, ExerciseCommentVoteEntity } from "../../database/entities";

export const POST = createPostOperation("ExerciseCommentVote", "Write", async ({ currentUser, manager, params }) => {
  const { targetId, isUp = true } = params;

  const target = await manager.findOne(ExerciseCommentEntity, targetId, {
    relations: ["summary", "author"],
  });
  if (target === undefined) {
    throw createError(400);
  }
  if (target.summary === undefined) {
    throw createError(500);
  }

  const exerciseCommentVote = new ExerciseCommentVoteEntity(target, currentUser, isUp);
  await manager.save(exerciseCommentVote);

  if (isUp) {
    target.summary.upvoteCount += 1;
  } else {
    target.summary.downvoteCount += 1;
  }
  await manager.save(target.summary);

  target.summary.parent = target;

  return [exerciseCommentVote, target.summary];
});
