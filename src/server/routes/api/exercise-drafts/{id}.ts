import createError from "http-errors";
import { getMinMaxTypeCount } from "../../../../shared/exercise";
import { createGetOperation, createPatchOperation } from "../../../api/operation";
import { ExerciseDraftEntity, ExerciseEntity, RevisionEntity, RevisionSummaryEntity } from "../../../database/entities";
import { updateExerciseContent } from "../../../database/entities/BaseExerciseClass";
import { getTags } from "../../../services/tags";

export const GET = createGetOperation("ExerciseDraft", "Read", async ({ currentUser, manager, id }) => {
  const exerciseDraft = await manager.findOne(ExerciseDraftEntity, id, {
    relations: ["exercise"]
  });
  if (exerciseDraft === undefined) {
    throw createError(404);
  }
  if (exerciseDraft.exercise === undefined) {
    throw createError(500);
  }

  const isAuthor = exerciseDraft.exercise.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  return [exerciseDraft];
});

export const PATCH = createPatchOperation("ExerciseDraft", "Read", async ({ currentUser, manager, id, params }) => {
  const { isMerged = true } = params;

  const exerciseDraft = await manager.findOne(ExerciseDraftEntity, id);
  if (exerciseDraft === undefined) {
    throw createError(404);
  }

  const exercise = await manager.findOne(ExerciseEntity, exerciseDraft.exerciseId, {
    relations: ["author", "author.summary", "summary", "summary.tags", "summary.tags.summary", "latest", "draft"]
  });
  if (exercise === undefined) {
    throw createError(404);
  }
  if (
    exercise.summary === undefined ||
    exercise.summary.tags === undefined ||
    exercise.latest === undefined ||
    exercise.draft === undefined
  ) {
    throw createError(500);
  }

  const isAuthor = exercise.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  updateExerciseContent(exercise.draft, params);

  if (isMerged) {
    if (exercise.isDraft) {
      updateExerciseContent(exercise.latest, {
        ...exercise.draft,
        ...params
      });
      await manager.save(exercise.latest);
    } else {
      const revisionSummary = new RevisionSummaryEntity();
      const revision = new RevisionEntity(
        revisionSummary,
        exercise,
        {
          ...exercise.draft,
          ...params
        },
        params.messageSubject || "",
        params.messageBody || "",
        exercise.isPrivate
      );
      await manager.save(revision);

      exercise.latest = revision;
    }

    const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

    exercise.isDraft = false;

    exercise.summary.maxTypeCount = maxTypeCount;
    exercise.summary.minTypeCount = minTypeCount;
    exercise.summary.tags = await getTags(exercise.summary, params, manager);

    exercise.draft.isMerged = true;
  }

  await manager.save(exercise);

  return [exercise, exercise.draft];
});
