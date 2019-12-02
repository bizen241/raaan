import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseVote } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { ExerciseEntity, ExerciseVoteEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { voterId, targetId, isUp, searchLimit, searchOffset } = parseQuery<ExerciseVote>("ExerciseVote", req.query);

  const isVoter = voterId === currentUser.id;
  if (!isVoter) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(ExerciseVoteEntity, "exerciseVote")
    .take(searchLimit)
    .skip(searchOffset);

  if (voterId !== undefined) {
    query.andWhere("exerciseVote.voterId = :voterId", { voterId });
  }
  if (targetId !== undefined) {
    query.andWhere("exerciseVote.targetId = :targetId", { targetId });
  }
  if (isUp !== undefined) {
    query.andWhere("exerciseVote.isUp = :isUp", { isUp });
  }

  const [exerciseVotes, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseVotes, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseVote",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { targetId, isUp = true }: Params<ExerciseVote> = req.body;

  await getManager().transaction(async manager => {
    const target = await manager.findOne(ExerciseEntity, targetId, {
      relations: ["author", "summary", "summary.tags", "draft"]
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

    target.summary.exercise = target;

    responseFindResult(req, res, exerciseVote, target.summary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ExerciseVote",
  permission: "Write",
  hasBody: true
});
