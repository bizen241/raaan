import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseVote } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, ExerciseVoteEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { targetId, isUp = true }: Params<ExerciseVote> = req.body;

  await getManager().transaction(async manager => {
    const target = await manager.findOne(ExerciseEntity, targetId, {
      relations: ["summary"]
    });
    if (target === undefined) {
      return next(createError(404));
    }
    if (target.summary === undefined) {
      return next(createError(500));
    }

    const exerciseVote = new ExerciseVoteEntity(target, currentUser, isUp);
    await manager.save(exerciseVote);

    if (isUp) {
      target.summary.upvoteCount += 1;
    } else {
      target.summary.downvoteCount += 1;
    }
    await manager.save(target.summary);

    responseFindResult(req, res, exerciseVote);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseVote",
  summary: "Vote",
  permission: "Write",
  hasBody: true
});
