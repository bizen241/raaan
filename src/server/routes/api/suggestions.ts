import createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { RevisionEntity, SuggestionEntity, SuggestionSummaryEntity } from "../../database/entities";

export const POST = createPostOperation("Suggestion", "Write", async ({ currentUser, manager, params }) => {
  const { revisionId, messageSubject = "", messageBody = "" } = params;
  if (revisionId === undefined) {
    throw createError(400);
  }

  const revision = await manager.findOne(RevisionEntity, revisionId);
  if (revision === undefined) {
    throw createError(400);
  }

  const suggestionSummary = new SuggestionSummaryEntity();

  const suggestion = new SuggestionEntity(
    suggestionSummary,
    currentUser,
    revision,
    {
      ...revision,
      ...params,
    },
    messageSubject,
    messageBody
  );
  await manager.save(suggestion);

  return [suggestion];
});
