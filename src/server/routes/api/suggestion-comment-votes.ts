import createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { SuggestionCommentEntity, SuggestionCommentVoteEntity } from "../../database/entities";

export const POST = createPostOperation("SuggestionCommentVote", "Write", async ({ currentUser, manager, params }) => {
  const { targetId, isUp = true } = params;

  const target = await manager.findOne(SuggestionCommentEntity, targetId, {
    relations: ["summary", "author"]
  });
  if (target === undefined) {
    throw createError(404);
  }
  if (target.summary === undefined) {
    throw createError(500);
  }

  const suggestionCommentVote = new SuggestionCommentVoteEntity(target, currentUser, isUp);
  await manager.save(suggestionCommentVote);

  const targetSummary = target.summary;

  if (isUp) {
    targetSummary.upvoteCount += 1;
  } else {
    targetSummary.downvoteCount += 1;
  }
  await manager.save(targetSummary);

  targetSummary.parent = target;

  return [suggestionCommentVote, targetSummary];
});
