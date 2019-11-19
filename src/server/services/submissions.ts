import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { Entity, SubmissionEntity, UserEntity } from "../database/entities";
import { updateExerciseDiarySubmittedCount } from "./exercise-diaries";
import { updateExerciseSummarySubmittedCount } from "./exercise-summaries";
import { updateSubmissionSummarySubmitCount } from "./submission-summaries";
import { updateUserDiarySubmitCount, updateUserDiarySubmittedCount } from "./user-diaries";
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
  const userDiary = await updateUserDiarySubmitCount(params);
  const exerciseSummary = await updateExerciseSummarySubmittedCount(params);
  const exerciseDiary = await updateExerciseDiarySubmittedCount(params);

  if (exercise.authorId !== params.currentUser.id) {
    await updateUserDiarySubmittedCount(params);
  }

  return [submissionSummary, userSummary, userDiary, exerciseSummary, exerciseDiary];
};

export const getSubmittedDateString = ({ createdAt }: SubmissionEntity) =>
  `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()}`;
