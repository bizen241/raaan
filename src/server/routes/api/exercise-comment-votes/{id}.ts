import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseCommentVoteEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseCommentVoteId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const exerciseCommentVote = await manager.findOne(ExerciseCommentVoteEntity, exerciseCommentVoteId, {
      relations: ["target", "target.summary"]
    });
    if (exerciseCommentVote === undefined) {
      return next(createError(404));
    }
    if (exerciseCommentVote.target === undefined || exerciseCommentVote.target.summary === undefined) {
      return next(createError(500));
    }

    const isVoter = exerciseCommentVote.voterId === currentUser.id;
    if (!isVoter) {
      return next(createError(403));
    }

    if (exerciseCommentVote.isUp) {
      exerciseCommentVote.target.summary.upvoteCount -= 1;
    } else {
      exerciseCommentVote.target.summary.downvoteCount -= 1;
    }
    await manager.save(exerciseCommentVote.target.summary);

    await manager.remove(exerciseCommentVote);

    responseFindResult(req, res, exerciseCommentVote.target.summary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "ExerciseCommentVote",
  permission: "Read",
  hasId: true
});
