import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { SuggestionCommentEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: suggestionCommentId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const suggestionComment = await manager.findOne(SuggestionCommentEntity, suggestionCommentId, {
      relations: ["target", "target.summary"]
    });
    if (suggestionComment === undefined) {
      return next(createError(404));
    }
    if (suggestionComment.target === undefined || suggestionComment.target.summary === undefined) {
      return next(createError(500));
    }

    const isAuthor = suggestionComment.authorId === currentUser.id;
    if (!isAuthor) {
      return next(createError(403));
    }

    const targetSummary = suggestionComment.target.summary;

    targetSummary.commentCount -= 1;
    await manager.save(targetSummary);

    await manager.remove(suggestionComment);

    responseFindResult(req, res, targetSummary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "SuggestionComment",
  permission: "Read",
  hasId: true
});
