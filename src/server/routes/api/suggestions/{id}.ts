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
    relations: ["summary", "revision"]
  });
  if (suggestion === undefined) {
    throw createError(404);
  }

  const isAuthor = suggestion.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  if (params.title !== undefined) {
    suggestion.title = params.title;
  }
  if (params.tags !== undefined) {
    suggestion.tags = params.tags;
  }
  if (params.questions !== undefined) {
    suggestion.questions = params.questions;
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
