import { createSearchOperation } from "../../api/operation";
import { SuggestionCommentSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("SuggestionCommentSummary", "Read", async ({ manager, params }) => {
  const { authorId } = params;

  const query = manager
    .createQueryBuilder(SuggestionCommentSummaryEntity, "suggestionCommentSummary")
    .leftJoinAndSelect("suggestionCommentSummary.parent", "parent")
    .leftJoinAndSelect("parent.target", "target")
    .leftJoinAndSelect("parent.author", "author");

  if (authorId !== undefined) {
    query.andWhere("parent.authorId = :authorId", { authorId });
  }

  return query;
});
