import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { ExerciseCommentVoteEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("ExerciseCommentVote", "Read", async ({ currentUser, manager, id }) => {
  const exerciseCommentVote = await manager.findOne(ExerciseCommentVoteEntity, id, {
    relations: ["target", "target.summary"]
  });
  if (exerciseCommentVote === undefined) {
    throw createError(404);
  }
  if (exerciseCommentVote.target === undefined || exerciseCommentVote.target.summary === undefined) {
    throw createError(500);
  }

  const isVoter = exerciseCommentVote.voterId === currentUser.id;
  if (!isVoter) {
    throw createError(403);
  }

  await manager.remove(exerciseCommentVote);

  const targetSummary = exerciseCommentVote.target.summary;

  if (exerciseCommentVote.isUp) {
    targetSummary.upvoteCount -= 1;
  } else {
    targetSummary.downvoteCount -= 1;
  }
  await manager.save(targetSummary);

  return [targetSummary];
});
