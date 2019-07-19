import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { EntityManager, getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { getScore } from "../../../shared/exercise";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  ExerciseSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserEntity,
  UserSummaryEntity
} from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { exerciseId, typeCount, time, accuracy }: SaveParams<Submission> = req.body;
  if (exerciseId === undefined || typeCount === undefined || time === undefined || accuracy === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
      relations: ["author", "summary", "summary.tags"]
    });
    if (exercise === undefined) {
      return next(createError(400));
    }
    if (exercise.summary === undefined) {
      return next(createError(500));
    }

    const submission = await manager.save(new SubmissionEntity(currentUser, exercise, typeCount, time, accuracy));
    const submissionSummary = await saveSubmissionSummary(manager, currentUser, exercise, submission);
    const userSummary = await saveUserSummary(manager, currentUser, typeCount);
    const exerciseSummary = await saveExerciseSummary(manager, exercise.summary);

    submissionSummary.exercise = exercise;
    exerciseSummary.exercise = exercise;

    responseFindResult(req, res, submissionSummary, userSummary, exerciseSummary);
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
      user: currentUser,
      exercise
    },
    { relations: ["latest", "best"] }
  );

  const {} = submission;

  if (submissionSummary !== undefined) {
    const { latest, best } = submissionSummary;

    submissionSummary.latest = submission;
    submissionSummary.submitCount += 1;

    const shouldBestSubmissionUpdate = getScore(submission) > getScore(best);

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

const saveExerciseSummary = async (manager: EntityManager, exerciseSummary: ExerciseSummaryEntity) => {
  exerciseSummary.submitCount += 1;

  await manager.save(exerciseSummary);

  return exerciseSummary;
};
