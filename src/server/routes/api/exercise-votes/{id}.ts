import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ExerciseVoteEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: exerciseVoteId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const exerciseVote = await manager.findOne(ExerciseVoteEntity, exerciseVoteId, {
      relations: ["target", "target.summary"]
    });
    if (exerciseVote === undefined) {
      return next(createError(404));
    }
    if (exerciseVote.target === undefined || exerciseVote.target.summary === undefined) {
      return next(createError(500));
    }

    const isVoter = exerciseVote.voterId === currentUser.id;
    if (!isVoter) {
      return next(createError(403));
    }

    if (exerciseVote.isUp) {
      exerciseVote.target.summary.upvoteCount -= 1;
    } else {
      exerciseVote.target.summary.downvoteCount -= 1;
    }
    await manager.save(exerciseVote.target.summary);

    await manager.remove(exerciseVote);

    responseFindResult(req, res, exerciseVote.target.summary);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "ExerciseVote",
  permission: "Read",
  hasId: true
});
