import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseCommentVote } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseCommentEntity, ExerciseCommentVoteEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { targetId, isUp = true }: Params<ExerciseCommentVote> = req.body;

  await getManager().transaction(async manager => {
    const target = await manager.findOne(ExerciseCommentEntity, targetId, {
      relations: ["summary", "author"]
    });
    if (target === undefined) {
      return next(createError(404));
    }
    if (target.summary === undefined) {
      return next(createError(500));
    }

    const exerciseCommentVote = new ExerciseCommentVoteEntity(target, currentUser, isUp);
    await manager.save(exerciseCommentVote);

    if (isUp) {
      target.summary.upvoteCount += 1;
    } else {
      target.summary.downvoteCount += 1;
    }
    await manager.save(target.summary);

    target.summary.parent = target;

    responseFindResult(req, res, exerciseCommentVote, target.summary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseCommentVote",
  permission: "Write",
  hasBody: true
});
