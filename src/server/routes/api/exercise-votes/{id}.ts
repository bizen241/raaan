import createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { ExerciseVoteEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("ExerciseVote", "Read", async ({ currentUser, manager, id }) => {
  const exerciseVote = await manager.findOne(ExerciseVoteEntity, id, {
    relations: ["target", "target.summary"],
  });
  if (exerciseVote === undefined) {
    throw createError(404);
  }
  if (exerciseVote.target === undefined || exerciseVote.target.summary === undefined) {
    throw createError(500);
  }

  const isVoter = exerciseVote.voterId === currentUser.id;
  if (!isVoter) {
    throw createError(403);
  }

  await manager.remove(exerciseVote);

  const targetSummary = exerciseVote.target.summary;

  if (exerciseVote.isUp) {
    targetSummary.upvoteCount -= 1;
  } else {
    targetSummary.downvoteCount -= 1;
  }
  await manager.save(targetSummary);

  return [targetSummary];
});
