import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { SubmissionEntity, UserDiaryEntryEntity, UserEntity } from "../database/entities";
import { getSubmittedDateString } from "./submissions";

export const updateUserDiaryEntrySubmitCount = async (params: {
  manager: EntityManager;
  currentUser: UserEntity;
  submission: SubmissionEntity;
}) => {
  const { manager, currentUser, submission } = params;
  const { typeCount } = submission;
  const submittedDate = getSubmittedDateString(submission);

  const userDiaryEntry = await manager.findOne(UserDiaryEntryEntity, {
    userId: currentUser.id,
    date: submittedDate
  });

  if (userDiaryEntry === undefined) {
    const newUserDiaryEntry = new UserDiaryEntryEntity(currentUser, submittedDate);

    newUserDiaryEntry.submitCount += 1;
    newUserDiaryEntry.typeCount += typeCount;
    newUserDiaryEntry.submittedCount += 1;
    newUserDiaryEntry.typedCount += typeCount;

    await manager.save(newUserDiaryEntry);

    return newUserDiaryEntry;
  } else {
    userDiaryEntry.submitCount += 1;
    userDiaryEntry.typeCount += typeCount;
    userDiaryEntry.submittedCount += 1;
    userDiaryEntry.typedCount += typeCount;

    await manager.save(userDiaryEntry);

    return userDiaryEntry;
  }
};

export const updateUserDiaryEntrySubmittedCount = async (params: {
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

  const userDiaryEntry = await manager.findOne(UserDiaryEntryEntity, {
    userId: author.id,
    date: submittedDate
  });

  if (userDiaryEntry === undefined) {
    const newUserDiaryEntry = new UserDiaryEntryEntity(author, submittedDate);

    newUserDiaryEntry.submittedCount += 1;
    newUserDiaryEntry.typedCount += typeCount;

    await manager.save(newUserDiaryEntry);

    return newUserDiaryEntry;
  } else {
    userDiaryEntry.submittedCount += 1;
    userDiaryEntry.typedCount += typeCount;

    await manager.save(userDiaryEntry);

    return userDiaryEntry;
  }
};
