import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ExerciseEntity, SubmissionSummaryEntity, UserDiaryEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { exerciseId, time, accuracy }: SaveParams<Submission> = req.body;
  if (exerciseId === undefined || time === undefined || accuracy === undefined) {
    return next(createError(400));
  }

  const date = new Date();

  await getManager().transaction(async manager => {
    const exercise = await manager.findOne(ExerciseEntity, exerciseId);
    if (exercise === undefined) {
      return next(createError(400));
    }

    const submissionSummary = await manager.findOne(SubmissionSummaryEntity, {
      userId: currentUser.id,
      exerciseId: exercise.id
    });

    if (submissionSummary !== undefined) {
      const { averageTime, averageAccuracy, playCount } = submissionSummary;

      submissionSummary.averageTime += (time - averageTime) / (playCount + 1);
      submissionSummary.averageAccuracy += (accuracy - averageAccuracy) / (playCount + 1);
      submissionSummary.playCount += 1;

      await manager.save(submissionSummary);
    } else {
      const newSubmissionSummary = new SubmissionSummaryEntity(currentUser, exercise, time, accuracy);

      await manager.save(newSubmissionSummary);
    }

    const userDiary = await manager.findOne(UserDiaryEntity, {
      userId: currentUser.id,
      date
    });

    if (userDiary !== undefined) {
      userDiary.playCount += 1;

      await manager.save(userDiary);
    } else {
      const newUserDiary = new UserDiaryEntity(currentUser, date);

      await manager.save(newUserDiary);
    }

    const savedSubmissionSummary =
      submissionSummary ||
      (await manager.findOne(SubmissionSummaryEntity, {
        userId: currentUser.id,
        exerciseId: exercise.id
      }));
    if (savedSubmissionSummary === undefined) {
      return next(createError(500));
    }

    const savedUserDiary =
      userDiary ||
      (await manager.findOne(UserDiaryEntity, {
        userId: currentUser.id,
        date
      }));
    if (savedUserDiary === undefined) {
      return next(createError(500));
    }

    responseFindResult(res, savedSubmissionSummary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Submission",
  summary: "Create a submission",
  permission: "Write",
  hasBody: true
});
