import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { EntityManager, getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseDiaryEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserDiaryEntity,
  UserEntity,
  UserSummaryEntity
} from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { exerciseId, typeCount, time, accuracy, finishedAt }: SaveParams<Submission> = req.body;
  if (
    exerciseId === undefined ||
    typeCount === undefined ||
    time === undefined ||
    accuracy === undefined ||
    finishedAt === undefined
  ) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
      relations: ["author", "summary", "summary.tags"]
    });
    if (exercise === undefined) {
      return next(createError(400));
    }
    if (exercise.author === undefined || exercise.summary === undefined) {
      return next(createError(500));
    }

    if (typeCount > exercise.summary.maxTypeCount) {
      return next(createError(400));
    }
    if (finishedAt < currentUser.createdAt.getTime() || finishedAt > Date.now()) {
      return next(createError(400));
    }

    const submission = await manager.save(
      new SubmissionEntity(currentUser, exercise, {
        typeCount,
        time,
        accuracy,
        finishedAt
      })
    );
    const submissionSummary = await saveSubmissionSummary(manager, currentUser, exercise, submission);
    const userSummary = await saveUserSummary(manager, currentUser, typeCount);
    const userDiary = await saveUserDiary(manager, currentUser, typeCount, finishedAt);
    const exerciseSummary = await saveExerciseSummary(manager, exercise.summary, typeCount);
    const exerciseDiary = await saveExerciseDiary(manager, exercise, typeCount, finishedAt);
    if (exercise.authorId !== currentUser.id) {
      await saveAuthorDiary(manager, exercise.author, typeCount, finishedAt);
    }

    // TODO: delete
    submissionSummary.exercise = exercise;
    exerciseSummary.exercise = exercise;

    responseFindResult(req, res, submissionSummary, userSummary, userDiary, exerciseSummary, exerciseDiary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Submission",
  summary: "Create a submission",
  permission: "Read",
  hasBody: true
});

const saveSubmissionSummary = async (
  manager: EntityManager,
  currentUser: UserEntity,
  exercise: ExerciseEntity,
  submission: SubmissionEntity
) => {
  const submissionSummary = await manager.findOne(
    SubmissionSummaryEntity,
    {
      submitter: currentUser,
      exercise
    },
    { relations: ["latest"] }
  );

  if (submissionSummary === undefined) {
    const newSubmissionSummary = new SubmissionSummaryEntity(currentUser, exercise, submission);

    newSubmissionSummary.submitCount += 1;
    newSubmissionSummary.typeCount += submission.typeCount;

    await manager.save(newSubmissionSummary);

    return newSubmissionSummary;
  } else {
    const { latest } = submissionSummary;
    if (latest === undefined) {
      throw new Error("submissionSummary.latest is not defined");
    }

    submissionSummary.latest = submission;
    submissionSummary.submitCount += 1;
    submissionSummary.typeCount += submission.typeCount;

    await manager.save(submissionSummary);
    await manager.remove(latest);

    return submissionSummary;
  }
};

const saveUserSummary = async (manager: EntityManager, currentUser: UserEntity, typeCount: number) => {
  const userSummary = await manager.findOne(UserSummaryEntity, currentUser.summaryId);
  if (userSummary === undefined) {
    throw createError(500);
  }

  userSummary.submitCount += 1;
  userSummary.typeCount += typeCount;

  await manager.save(userSummary);

  return userSummary;
};

const saveUserDiary = async (
  manager: EntityManager,
  currentUser: UserEntity,
  typeCount: number,
  finishedAt: number
) => {
  const date = new Date(finishedAt);

  const userDiary = await manager.findOne(UserDiaryEntity, {
    userId: currentUser.id,
    date
  });

  if (userDiary === undefined) {
    const newUserDiary = new UserDiaryEntity(currentUser, date);

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

const saveExerciseSummary = async (
  manager: EntityManager,
  exerciseSummary: ExerciseSummaryEntity,
  typeCount: number
) => {
  exerciseSummary.submittedCount += 1;
  exerciseSummary.typedCount += typeCount;

  await manager.save(exerciseSummary);

  return exerciseSummary;
};

const saveExerciseDiary = async (
  manager: EntityManager,
  exercise: ExerciseEntity,
  typeCount: number,
  finishedAt: number
) => {
  const date = new Date(finishedAt);

  const exerciseDiary = await manager.findOne(ExerciseDiaryEntity, {
    exerciseId: exercise.id,
    date
  });

  if (exerciseDiary === undefined) {
    const newExerciseDiary = new ExerciseDiaryEntity(exercise, date);

    newExerciseDiary.submittedCount += 1;
    newExerciseDiary.typedCount += typeCount;

    await manager.save(newExerciseDiary);

    return newExerciseDiary;
  } else {
    exerciseDiary.submittedCount += 1;
    exerciseDiary.typedCount += typeCount;

    await manager.save(exerciseDiary);

    return exerciseDiary;
  }
};

const saveAuthorDiary = async (manager: EntityManager, author: UserEntity, typeCount: number, finishedAt: number) => {
  const date = new Date(finishedAt);

  const userDiary = await manager.findOne(UserDiaryEntity, {
    userId: author.id,
    date
  });

  if (userDiary === undefined) {
    const newUserDiary = new UserDiaryEntity(author, date);

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
