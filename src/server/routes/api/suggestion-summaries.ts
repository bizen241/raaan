import { createSearchOperation } from "../../api/operation";
import { SuggestionSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("SuggestionSummary", "Read", async ({ manager, params }) => {
  const { authorId, exerciseId, exerciseAuthorId } = params;

  const query = manager
    .createQueryBuilder(SuggestionSummaryEntity, "suggestionSummary")
    .leftJoinAndSelect("suggestionSummary.suggestion", "suggestion")
    .leftJoinAndSelect("suggestion.revision", "revision")
    .leftJoinAndSelect("revision.exercise", "exercise");

  if (authorId !== undefined) {
    query.andWhere("suggestion.authorId = :authorId", { authorId });
  }
  if (exerciseId !== undefined) {
    query.andWhere("revision.exerciseId = :exerciseId", { exerciseId });
  }
  if (exerciseAuthorId !== undefined) {
    query.andWhere("exercise.authorId = :authorId", { authorId: exerciseAuthorId });
  }

  return query;
});
