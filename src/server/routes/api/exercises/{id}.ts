import createError from "http-errors";
import { hasPermission } from "../../../../shared/api/security";
import { createDeleteOperation, createGetOperation, createPatchOperation } from "../../../api/operation";
import { ExerciseEntity } from "../../../database/entities";

export const GET = createGetOperation("Exercise", "Guest", async ({ currentUser, manager, id }) => {
  const exercise = await manager.findOne(ExerciseEntity, id, {
    relations: ["summary", "summary.tags", "author", "author.summary", "latest", "draft"]
  });
  if (exercise === undefined) {
    throw createError(404);
  }

  if (exercise.isPrivate && exercise.authorId !== currentUser.id) {
    throw createError(403);
  }

  return [exercise];
});

export const PATCH = createPatchOperation("Exercise", "Read", async ({ currentUser, manager, id, params }) => {
  const exercise = await manager.findOne(ExerciseEntity, id, {
    relations: ["summary", "summary.tags", "author", "author.summary", "latest", "draft"]
  });
  if (exercise === undefined) {
    throw createError(404);
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor && !hasPermission(currentUser, "Admin")) {
    throw createError(403);
  }

  if (isAuthor) {
    if (params.isPrivate !== undefined) {
      if (!exercise.isLocked) {
        exercise.isPrivate = params.isPrivate;
      }
    }
  } else {
    if (params.isLocked !== undefined) {
      exercise.isLocked = params.isLocked;

      if (params.isLocked) {
        exercise.isPrivate = true;
      }
    }
  }

  await manager.save(exercise);

  return [exercise];
});

export const DELETE = createDeleteOperation("Exercise", "Read", async ({ currentUser, manager, id }) => {
  const exercise = await manager.findOne(ExerciseEntity, id);
  if (exercise === undefined) {
    throw createError(404);
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  await manager.remove(exercise);

  return [];
});
