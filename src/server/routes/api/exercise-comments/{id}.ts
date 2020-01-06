import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { ExerciseCommentEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("ExerciseComment", "Read", async ({ currentUser, manager, id }) => {
  const exerciseComment = await manager.findOne(ExerciseCommentEntity, id, {
    relations: ["target", "target.summary"]
  });
  if (exerciseComment === undefined) {
    throw createError(404);
  }
  if (exerciseComment.target === undefined || exerciseComment.target.summary === undefined) {
    throw createError(500);
  }

  const isAuthor = exerciseComment.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  await manager.remove(exerciseComment);

  const targetSummary = exerciseComment.target.summary;

  targetSummary.commentCount -= 1;
  await manager.save(targetSummary);

  return [targetSummary];
});
