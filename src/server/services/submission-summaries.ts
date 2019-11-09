import { EntityManager } from "typeorm";
import { ExerciseEntity, SubmissionEntity, SubmissionSummaryEntity, UserEntity } from "../database/entities";

export const updateSubmissionSummarySubmitCount = async (
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
    if (submissionSummary.isRepeating) {
      submissionSummary.remindAt = setReminder(submissionSummary, latest, submission);
    }

    await manager.save(submissionSummary);
    await manager.remove(latest);

    return submissionSummary;
  }
};

const setReminder = (
  submissionSummary: SubmissionSummaryEntity,
  previous: SubmissionEntity,
  current: SubmissionEntity
) => {
  return new Date();
};
