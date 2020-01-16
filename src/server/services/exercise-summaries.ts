import createError from "http-errors";
import { EntityManager } from "typeorm";
import { ExerciseContent } from "../../shared/api/entities";
import { ExerciseSummaryEntity, SubmissionEntity } from "../database/entities";

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

export const updateExerciseSummaryTexts = (entity: ExerciseSummaryEntity, params: Partial<ExerciseContent>) => {
  entity.text = "";
  entity.title = params.title || entity.title || "";
  entity.questions = "";
};
