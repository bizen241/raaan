import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { EntityManager, getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { calculateScore } from "../../../shared/exercise/score";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  ExerciseSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserDiaryEntity,
  UserEntity,
  UserSummaryEntity
} from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { exerciseId, keystrokes, time, accuracy }: SaveParams<Submission> = req.body;
  if (exerciseId === undefined || keystrokes === undefined || time === undefined || accuracy === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
      relations: ["summary"]
    });
    if (exercise === undefined) {
      return next(createError(400));
    }
    if (exercise.summary === undefined) {
      return next(createError(500));
    }

    const submission = await manager.save(new SubmissionEntity(currentUser, exercise, keystrokes, time, accuracy));
    const submissionSummary = await saveSubmissionSummary(manager, currentUser, exercise, submission);
    const userDiary = await saveUserDiary(manager, currentUser);
    const userSummary = await saveUserSummary(manager, currentUser);
    const exerciseSummary = await saveExerciseSummary(manager, exercise.summary);

    responseFindResult(res, submissionSummary, userDiary, userSummary, exerciseSummary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Submission",
  summary: "Create a submission",
  permission: "Write",
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
      user: currentUser,
      exercise
    },
    { relations: ["latest", "best"] }
  );

  const {} = submission;

  if (submissionSummary !== undefined) {
    const { latest, best } = submissionSummary;

    submissionSummary.latest = submission;
    submissionSummary.playCount += 1;

    const shouldBestSubmissionUpdate = calculateScore(submission) > calculateScore(best);

    if (shouldBestSubmissionUpdate) {
      submissionSummary.best = submission;
    }

    await manager.save(submissionSummary);

    if (shouldBestSubmissionUpdate) {
      await manager.remove([latest, best]);
    } else if (latest.id !== best.id) {
      await manager.remove(latest);
    }

    return submissionSummary;
  } else {
    const newSubmissionSummary = new SubmissionSummaryEntity(currentUser, exercise, submission);

    await manager.save(newSubmissionSummary);

    return newSubmissionSummary;
  }
};

const saveUserDiary = async (manager: EntityManager, currentUser: UserEntity) => {
  const date = new Date();

  const userDiary = await manager.findOne(UserDiaryEntity, {
    user: currentUser,
    date
  });

  if (userDiary !== undefined) {
    userDiary.playCount += 1;

    await manager.save(userDiary);

    return userDiary;
  } else {
    const newUserDiary = new UserDiaryEntity(currentUser, date);

    await manager.save(newUserDiary);

    return newUserDiary;
  }
};

const saveUserSummary = async (manager: EntityManager, currentUser: UserEntity) => {
  const userSummary = await manager.findOne(UserSummaryEntity, currentUser.summaryId);
  if (userSummary === undefined) {
    throw createError(500);
  }

  userSummary.playCount += 1;

  await manager.save(userSummary);

  return userSummary;
};

const saveExerciseSummary = async (manager: EntityManager, exerciseSummary: ExerciseSummaryEntity) => {
  exerciseSummary.playCount += 1;

  await manager.save(exerciseSummary);

  return exerciseSummary;
};
