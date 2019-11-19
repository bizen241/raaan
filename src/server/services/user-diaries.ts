import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { SubmissionEntity, UserDiaryEntity, UserEntity } from "../database/entities";
import { getSubmittedDateString } from "./submissions";

export const updateUserDiarySubmitCount = async (params: {
  manager: EntityManager;
  currentUser: UserEntity;
  submission: SubmissionEntity;
}) => {
  const { manager, currentUser, submission } = params;
  const { typeCount } = submission;
  const submittedDate = getSubmittedDateString(submission);

  const userDiary = await manager.findOne(UserDiaryEntity, {
    userId: currentUser.id,
    date: submittedDate
  });

  if (userDiary === undefined) {
    const newUserDiary = new UserDiaryEntity(currentUser, submittedDate);

    newUserDiary.submitCount += 1;
    newUserDiary.typeCount += typeCount;
    newUserDiary.submittedCount += 1;
    newUserDiary.typedCount += typeCount;

    await manager.save(newUserDiary);

    return newUserDiary;
  } else {
    userDiary.submitCount += 1;
    userDiary.typeCount += typeCount;
    userDiary.submittedCount += 1;
    userDiary.typedCount += typeCount;

    await manager.save(userDiary);

    return userDiary;
  }
};

export const updateUserDiarySubmittedCount = async (params: {
  manager: EntityManager;
  submission: SubmissionEntity;
}) => {
  const { manager, submission } = params;
  if (submission.exercise === undefined) {
    throw createError(500, "submission.exercise is not defined");
  }
  if (submission.exercise.author === undefined) {
    throw createError(500, "submission.exercise.author is not defined");
  }

  const { author } = submission.exercise;
  const { typeCount } = submission;
  const submittedDate = getSubmittedDateString(submission);

  const userDiary = await manager.findOne(UserDiaryEntity, {
    userId: author.id,
    date: submittedDate
  });

  if (userDiary === undefined) {
    const newUserDiary = new UserDiaryEntity(author, submittedDate);

    newUserDiary.submittedCount += 1;
    newUserDiary.typedCount += typeCount;

    await manager.save(newUserDiary);

    return newUserDiary;
  } else {
    userDiary.submittedCount += 1;
    userDiary.typedCount += typeCount;

    await manager.save(userDiary);

    return userDiary;
  }
};
