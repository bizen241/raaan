import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { ExerciseDiaryEntity, SubmissionEntity } from "../database/entities";
import { getSubmittedDateString } from "./submissions";

export const updateExerciseDiarySubmittedCount = async (params: {
  manager: EntityManager;
  submission: SubmissionEntity;
}) => {
  const { manager, submission } = params;
  const { exercise, typeCount } = submission;
  const submittedDate = getSubmittedDateString(submission);
  if (exercise === undefined) {
    throw createError(500, "submission.exercise is not defined");
  }

  const exerciseDiary = await manager.findOne(ExerciseDiaryEntity, {
    exerciseId: exercise.id,
    date: submittedDate
  });

  if (exerciseDiary === undefined) {
    const newExerciseDiary = new ExerciseDiaryEntity(exercise, submittedDate);

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
