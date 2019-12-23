import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { SuggestionSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { authorId, exerciseId, exerciseAuthorId, searchLimit, searchOffset } = parseQuery(
    "SuggestionSummary",
    req.query
  );

  const query = getManager()
    .createQueryBuilder(SuggestionSummaryEntity, "suggestionSummary")
    .leftJoinAndSelect("suggestionSummary.suggestion", "suggestion")
    .leftJoinAndSelect("suggestion.revision", "revision")
    .leftJoinAndSelect("revision.exercise", "exercise")
    .take(searchLimit)
    .skip(searchOffset);

  if (authorId !== undefined) {
    query.andWhere("suggestion.authorId = :authorId", { authorId });
  }
  if (exerciseId !== undefined) {
    query.andWhere("revision.exerciseId = :exerciseId", { exerciseId });
  }
  if (exerciseAuthorId !== undefined) {
    query.andWhere("exercise.authorId = :authorId", { authorId: exerciseAuthorId });
  }

  const [suggestionSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, suggestionSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "SuggestionSummary",
  permission: "Read",
  hasQuery: true
});
