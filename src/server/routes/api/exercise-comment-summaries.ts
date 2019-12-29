import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { ExerciseCommentSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { authorId, searchLimit, searchOffset } = parseQuery("ExerciseCommentSummary", req.query);

  const query = getManager()
    .createQueryBuilder(ExerciseCommentSummaryEntity, "exerciseCommentSummaries")
    .leftJoinAndSelect("exerciseCommentSummary.parent", "parent")
    .leftJoinAndSelect("parent.target", "target")
    .leftJoinAndSelect("parent.author", "author")
    .take(searchLimit)
    .skip(searchOffset);

  if (authorId !== undefined) {
    query.andWhere("parent.authorId = :authorId", { authorId });
  }

  const [exerciseCommentSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseCommentSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseCommentSummary",
  permission: "Read",
  hasQuery: true
});
