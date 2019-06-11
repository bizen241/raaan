import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Submission } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ExerciseEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserDiaryEntity,
  UserSummaryEntity
} from "../../database/entities";

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

    const submission = new SubmissionEntity(currentUser, exercise, time, accuracy);

    const submissionSummary = await manager.findOne(
      SubmissionSummaryEntity,
      {
        user: currentUser,
        exercise
      },
      { relations: ["latest", "best"] }
    );

    if (submissionSummary !== undefined) {
      const { latest, best } = submissionSummary;

      submissionSummary.latest = submission;
      submissionSummary.playCount += 1;

      const shouldBestSubmissionUpdate = time * accuracy > best.time * best.accuracy;

      if (shouldBestSubmissionUpdate) {
        submissionSummary.best = submission;
      }

      if (shouldBestSubmissionUpdate) {
        await manager.remove(latest);
      } else if (latest.id !== best.id) {
        await manager.remove([latest, best]);
      }

      await manager.save(submissionSummary);
    } else {
      const newSubmissionSummary = new SubmissionSummaryEntity(currentUser, exercise, submission);

      await manager.save(newSubmissionSummary);
    }

    const userDiary = await manager.findOne(UserDiaryEntity, {
      user: currentUser,
      date
    });

    if (userDiary !== undefined) {
      userDiary.playCount += 1;

      await manager.save(userDiary);
    } else {
      const newUserDiary = new UserDiaryEntity(currentUser, date);

      await manager.save(newUserDiary);
    }

    const userSummary = await manager.findOne(UserSummaryEntity, currentUser.summaryId);
    if (userSummary === undefined) {
      return next(createError(500));
    }

    userSummary.playCount += 1;

    await manager.save(userSummary);

    const savedSubmissionSummary =
      submissionSummary ||
      (await manager.findOne(
        SubmissionSummaryEntity,
        {
          user: currentUser,
          exercise
        },
        { relations: ["latest", "best"] }
      ));
    if (savedSubmissionSummary === undefined) {
      return next(createError(500));
    }

    const savedUserDiary =
      userDiary ||
      (await manager.findOne(UserDiaryEntity, {
        user: currentUser,
        date
      }));
    if (savedUserDiary === undefined) {
      return next(createError(500));
    }

    responseFindResult(res, savedSubmissionSummary, savedUserDiary, userSummary);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Submission",
  summary: "Create a submission",
  permission: "Write",
  hasBody: true
});
