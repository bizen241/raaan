import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { ExerciseCommentEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { targetId, searchLimit, searchOffset } = parseQuery("ExerciseComment", req.query);

  const query = getManager()
    .createQueryBuilder(ExerciseCommentEntity, "exerciseComment")
    .leftJoinAndSelect("exerciseComment.summary", "summary")
    .leftJoinAndSelect("exerciseComment.target", "target")
    .leftJoinAndSelect("exerciseComment.author", "author")
    .take(searchLimit)
    .skip(searchOffset);

  if (targetId !== undefined) {
    query.andWhere("exerciseComment.targetId = :targetId", { targetId });
  }

  const [exerciseCommentSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseCommentSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseComment",
  permission: "Read",
  hasQuery: true
});
