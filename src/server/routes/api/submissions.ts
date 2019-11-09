import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, SubmissionEntity } from "../../database/entities";
import { updateExerciseDiarySubmittedCount } from "../../services/exercise-diaries";
import { updateExerciseSummarySubmittedCount } from "../../services/exercise-summaries";
import { updateSubmissionSummarySubmitCount } from "../../services/submission-summaries";
import { updateUserDiarySubmitCount, updateUserDiarySubmittedCount } from "../../services/user-diaries";
import { updateUserSummarySubmitCount } from "../../services/user-summaries";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { exerciseId, typeCount, time, accuracy }: Params<Submission> = req.body;
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
    if (exercise.author === undefined || exercise.summary === undefined) {
      return next(createError(500));
    }

    if (typeCount > exercise.summary.maxTypeCount) {
      return next(createError(400));
    }

    const submission = await manager.save(
      new SubmissionEntity(currentUser, exercise, {
        typeCount,
        time,
        accuracy
      })
    );

    const submittedAt = submission.createdAt;
    const submittedDate = `${submittedAt.getFullYear()}-${submittedAt.getMonth() + 1}-${submittedAt.getDate()}`;

    const submissionSummary = await updateSubmissionSummarySubmitCount(manager, currentUser, exercise, submission);
    const userSummary = await updateUserSummarySubmitCount(manager, currentUser, typeCount);
    const userDiary = await updateUserDiarySubmitCount(manager, currentUser, typeCount, submittedDate);
    const exerciseSummary = await updateExerciseSummarySubmittedCount(manager, exercise.summary, typeCount);
    const exerciseDiary = await updateExerciseDiarySubmittedCount(manager, exercise, typeCount, submittedDate);
    if (exercise.authorId !== currentUser.id) {
      await updateUserDiarySubmittedCount(manager, exercise.author, typeCount, submittedDate);
    }

    submissionSummary.exercise = exercise;
    exerciseSummary.exercise = exercise;

    responseFindResult(req, res, submissionSummary, userSummary, userDiary, exerciseSummary, exerciseDiary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Submission",
  permission: "Read",
  hasBody: true
});
