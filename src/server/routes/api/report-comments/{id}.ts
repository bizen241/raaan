import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ReportCommentEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: reportCommentId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const reportComment = await manager.findOne(ReportCommentEntity, reportCommentId, {
      relations: ["target", "target.summary"]
    });
    if (reportComment === undefined) {
      return next(createError(404));
    }
    if (reportComment.target === undefined || reportComment.target.summary === undefined) {
      return next(createError(500));
    }

    const isAuthor = reportComment.authorId === currentUser.id;
    if (!isAuthor) {
      return next(createError(403));
    }

    const targetSummary = reportComment.target.summary;

    targetSummary.commentCount -= 1;
    await manager.save(targetSummary);

    await manager.remove(reportComment);

    responseFindResult(req, res, targetSummary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "ReportComment",
  permission: "Read",
  hasId: true
});
