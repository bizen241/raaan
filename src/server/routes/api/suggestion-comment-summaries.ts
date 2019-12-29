import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { SuggestionCommentSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { authorId, searchLimit, searchOffset } = parseQuery("SuggestionCommentSummary", req.query);

  const query = getManager()
    .createQueryBuilder(SuggestionCommentSummaryEntity, "suggestionCommentSummaries")
    .leftJoinAndSelect("suggestionCommentSummary.parent", "parent")
    .leftJoinAndSelect("parent.target", "target")
    .leftJoinAndSelect("parent.author", "author")
    .take(searchLimit)
    .skip(searchOffset);

  if (authorId !== undefined) {
    query.andWhere("parent.authorId = :authorId", { authorId });
  }

  const [suggestionCommentSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, suggestionCommentSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "SuggestionCommentSummary",
  permission: "Read",
  hasQuery: true
});
