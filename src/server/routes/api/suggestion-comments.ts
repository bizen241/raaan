import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { SuggestionCommentEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { targetId, searchLimit, searchOffset } = parseQuery("SuggestionComment", req.query);

  const query = getManager()
    .createQueryBuilder(SuggestionCommentEntity, "suggestionComment")
    .leftJoinAndSelect("suggestionComment.summary", "summary")
    .leftJoinAndSelect("suggestionComment.target", "target")
    .leftJoinAndSelect("suggestionComment.author", "author")
    .take(searchLimit)
    .skip(searchOffset);

  if (targetId !== undefined) {
    query.andWhere("suggestionComment.targetId = :targetId", { targetId });
  }

  const [suggestionCommentSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, suggestionCommentSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "SuggestionComment",
  permission: "Read",
  hasQuery: true
});
