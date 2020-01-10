import * as createError from "http-errors";
import { createDeleteOperation, createGetOperation, createPatchOperation } from "../../../api/operation";
import { SuggestionEntity } from "../../../database/entities";

export const GET = createGetOperation("Suggestion", "Read", async ({ manager, id }) => {
  const suggestion = await manager.findOne(SuggestionEntity, id, {
    relations: ["summary", "revision"]
  });
  if (suggestion === undefined) {
    throw createError(404);
  }

  return [suggestion];
});

export const PATCH = createPatchOperation("Suggestion", "Write", async ({ currentUser, manager, id, params }) => {
  const suggestion = await manager.findOne(SuggestionEntity, id, {
    relations: ["summary", "revision", "revision.exercise"]
  });
  if (suggestion === undefined) {
    throw createError(404);
  }
  if (suggestion.revision === undefined || suggestion.revision.exercise === undefined) {
    throw createError(500);
  }

  const isSuggestionAuthor = suggestion.authorId === currentUser.id;
  const isExerciseAuthor = suggestion.revision.exercise.authorId === currentUser.id;
  if (!isSuggestionAuthor && !isExerciseAuthor) {
    throw createError(403);
  }

  if (isSuggestionAuthor) {
    if (params.title !== undefined) {
      suggestion.title = params.title;
    }
    if (params.tags !== undefined) {
      suggestion.tags = params.tags;
    }
    if (params.questions !== undefined) {
      suggestion.questions = params.questions;
    }
  } else {
    const state = params.state;

    if (state !== undefined && state !== "accepted") {
      suggestion.state = state;
    }
  }

  await manager.save(suggestion);

  return [suggestion];
});

export const DELETE = createDeleteOperation("Suggestion", "Read", async ({ currentUser, manager, id }) => {
  const suggestion = await manager.findOne(SuggestionEntity, id);
  if (suggestion === undefined) {
    throw createError(404);
  }

  const isAuthor = suggestion.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  await manager.remove(suggestion);

  return [];
});
