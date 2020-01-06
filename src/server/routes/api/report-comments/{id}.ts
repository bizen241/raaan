import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { ReportCommentEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("ReportComment", "Read", async ({ currentUser, manager, id }) => {
  const reportComment = await manager.findOne(ReportCommentEntity, id, {
    relations: ["target", "target.summary"]
  });
  if (reportComment === undefined) {
    throw createError(404);
  }
  if (reportComment.target === undefined || reportComment.target.summary === undefined) {
    throw createError(500);
  }

  const isAuthor = reportComment.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  const targetSummary = reportComment.target.summary;

  targetSummary.commentCount -= 1;
  await manager.save(targetSummary);

  await manager.remove(reportComment);

  return [targetSummary];
});
