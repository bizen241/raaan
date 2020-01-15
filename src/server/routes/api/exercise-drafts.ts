import createError from "http-errors";
import { getMinMaxTypeCount } from "../../../shared/exercise";
import { createPostOperation } from "../../api/operation";
import {
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  RevisionEntity,
  RevisionSummaryEntity
} from "../../database/entities";
import { getTags } from "../../services/tags";

export const POST = createPostOperation("ExerciseDraft", "Read", async ({ currentUser, manager, params }) => {
  const { isMerged = true, isPrivate = true } = params;

  const exerciseSummary = new ExerciseSummaryEntity();
  if (isMerged) {
    const { maxTypeCount, minTypeCount } = getMinMaxTypeCount(params.questions);

    exerciseSummary.maxTypeCount = maxTypeCount;
    exerciseSummary.minTypeCount = minTypeCount;
    exerciseSummary.tags = await getTags(exerciseSummary, params, manager);
  }

  const exerciseDraft = new ExerciseDraftEntity(params);
  exerciseDraft.isMerged = isMerged;

  const exercise = new ExerciseEntity(exerciseSummary, currentUser, exerciseDraft);
  exercise.isDraft = !isMerged;
  exercise.isPrivate = isPrivate;
  await manager.save(exercise);

  const revisionSummary = new RevisionSummaryEntity();
  const revision = new RevisionEntity(
    revisionSummary,
    exercise,
    exerciseDraft,
    params.messageSubject || "",
    params.messageBody || "",
    isPrivate
  );
  await manager.save(revision);

  exercise.latest = revision;

  await manager.save(exercise);

  const savedExercise = await manager.findOne(ExerciseEntity, exercise.id, {
    relations: ["author", "author.summary", "summary", "summary.tags", "latest", "draft"]
  });
  if (savedExercise === undefined) {
    throw createError(500, "savedExercise is not defined");
  }

  return [savedExercise];
});
