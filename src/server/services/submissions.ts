import createError from "http-errors";
import { EntityManager } from "typeorm";
import { Entity, SubmissionEntity, UserEntity } from "../database/entities";
import { updateExerciseDiaryEntrySubmittedCount } from "./exercise-diaries";
import { updateExerciseSummarySubmittedCount } from "./exercise-summaries";
import { updateSubmissionSummarySubmitCount } from "./submission-summaries";
import { updateUserDiaryEntrySubmitCount, updateUserDiaryEntrySubmittedCount } from "./user-diary-entries";
import { updateUserSummarySubmitCount } from "./user-summaries";

export const updateRelatedEntities = async (params: {
  manager: EntityManager;
  currentUser: UserEntity;
  submission: SubmissionEntity;
}): Promise<Entity[]> => {
  const { exercise } = params.submission;
  if (exercise === undefined) {
    throw createError(500, "submission.exercise is not defined");
  }

  const submissionSummary = await updateSubmissionSummarySubmitCount(params);
  const userSummary = await updateUserSummarySubmitCount(params);
  const userDiaryEntry = await updateUserDiaryEntrySubmitCount(params);
  const exerciseSummary = await updateExerciseSummarySubmittedCount(params);
  const exerciseDiaryEntry = await updateExerciseDiaryEntrySubmittedCount(params);

  if (exercise.authorId !== params.currentUser.id) {
    await updateUserDiaryEntrySubmittedCount(params);
  }

  return [submissionSummary, userSummary, userDiaryEntry, exerciseSummary, exerciseDiaryEntry];
};
