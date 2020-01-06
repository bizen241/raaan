import { createSearchOperation } from "../../api/operation";
import { SuggestionCommentEntity } from "../../database/entities";

export const GET = createSearchOperation("SuggestionComment", "Read", async ({ manager, params }) => {
  const { targetId } = params;

  const query = manager
    .createQueryBuilder(SuggestionCommentEntity, "suggestionComment")
    .leftJoinAndSelect("suggestionComment.summary", "summary")
    .leftJoinAndSelect("suggestionComment.target", "target")
    .leftJoinAndSelect("suggestionComment.author", "author");

  if (targetId !== undefined) {
    query.andWhere("suggestionComment.targetId = :targetId", { targetId });
  }

  return query;
});
