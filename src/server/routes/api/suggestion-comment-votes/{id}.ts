import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { SuggestionCommentVoteEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("SuggestionCommentVote", "Read", async ({ currentUser, manager, id }) => {
  const suggestionCommentVote = await manager.findOne(SuggestionCommentVoteEntity, id, {
    relations: ["target", "target.summary"]
  });
  if (suggestionCommentVote === undefined) {
    throw createError(404);
  }
  if (suggestionCommentVote.target === undefined || suggestionCommentVote.target.summary === undefined) {
    throw createError(500);
  }

  const isVoter = suggestionCommentVote.voterId === currentUser.id;
  if (!isVoter) {
    throw createError(403);
  }

  const targetSummary = suggestionCommentVote.target.summary;

  if (suggestionCommentVote.isUp) {
    targetSummary.upvoteCount -= 1;
  } else {
    targetSummary.downvoteCount -= 1;
  }
  await manager.save(targetSummary);

  await manager.remove(suggestionCommentVote);

  return [targetSummary];
});
