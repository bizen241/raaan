import createError from "http-errors";
import { EntityManager } from "typeorm";
import { SubmissionEntity } from "../database/entities";

export const updateExerciseSummarySubmittedCount = async (params: {
  manager: EntityManager;
  submission: SubmissionEntity;
}) => {
  const { manager, submission } = params;
  if (submission.exercise === undefined) {
    throw createError(500, "submission.exercise is not defined");
  }
  if (submission.exercise.summary === undefined) {
    throw createError(500, "submission.exercise.summary is not defined");
  }

  const { typeCount } = submission;
  const { summary: exerciseSummary } = submission.exercise;

  exerciseSummary.submittedCount += 1;
  exerciseSummary.typedCount += typeCount;

  await manager.save(exerciseSummary);

  exerciseSummary.exercise = submission.exercise;

  return exerciseSummary;
};
