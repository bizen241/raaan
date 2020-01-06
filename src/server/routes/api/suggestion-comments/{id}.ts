import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { SuggestionCommentEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("SuggestionComment", "Read", async ({ currentUser, manager, id }) => {
  const suggestionComment = await manager.findOne(SuggestionCommentEntity, id, {
    relations: ["target", "target.summary"]
  });
  if (suggestionComment === undefined) {
    throw createError(404);
  }
  if (suggestionComment.target === undefined || suggestionComment.target.summary === undefined) {
    throw createError(500);
  }

  const isAuthor = suggestionComment.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  const targetSummary = suggestionComment.target.summary;

  targetSummary.commentCount -= 1;
  await manager.save(targetSummary);

  await manager.remove(suggestionComment);

  return [targetSummary];
});
