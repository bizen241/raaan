import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { ObjectionCommentEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("ObjectionComment", "Read", async ({ currentUser, manager, id }) => {
  const objectionComment = await manager.findOne(ObjectionCommentEntity, id, {
    relations: ["target", "target.summary"]
  });
  if (objectionComment === undefined) {
    throw createError(404);
  }
  if (objectionComment.target === undefined || objectionComment.target.summary === undefined) {
    throw createError(500);
  }

  const isAuthor = objectionComment.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  const targetSummary = objectionComment.target.summary;

  targetSummary.commentCount -= 1;
  await manager.save(targetSummary);

  await manager.remove(objectionComment);

  return [targetSummary];
});
