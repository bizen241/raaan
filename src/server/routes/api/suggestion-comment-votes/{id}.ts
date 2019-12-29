import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { SuggestionCommentVoteEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: suggestionCommentVoteId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const suggestionCommentVote = await manager.findOne(SuggestionCommentVoteEntity, suggestionCommentVoteId, {
      relations: ["target", "target.summary"]
    });
    if (suggestionCommentVote === undefined) {
      return next(createError(404));
    }
    if (suggestionCommentVote.target === undefined || suggestionCommentVote.target.summary === undefined) {
      return next(createError(500));
    }

    const isVoter = suggestionCommentVote.voterId === currentUser.id;
    if (!isVoter) {
      return next(createError(403));
    }

    if (suggestionCommentVote.isUp) {
      suggestionCommentVote.target.summary.upvoteCount -= 1;
    } else {
      suggestionCommentVote.target.summary.downvoteCount -= 1;
    }
    await manager.save(suggestionCommentVote.target.summary);

    await manager.remove(suggestionCommentVote);

    responseFindResult(req, res, suggestionCommentVote.target.summary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "SuggestionCommentVote",
  permission: "Read",
  hasId: true
});
