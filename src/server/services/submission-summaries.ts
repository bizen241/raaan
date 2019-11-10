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
      submissionSummary.remindAt = updateReminder(submissionSummary, latest, submission);
    }

    await manager.save(submissionSummary);
    await manager.remove(latest);

    return submissionSummary;
  }
};

const updateReminder = (
  submissionSummary: SubmissionSummaryEntity,
  previous: SubmissionEntity,
  current: SubmissionEntity
) => {
  const foo = submissionSummary.remindAt.getTime();
  const bar = previous.createdAt.getTime();
  const baz = current.createdAt.getTime();

  const interval = foo - bar;

  if (baz < foo) {
    return new Date(baz + interval);
  }

  if (current.accuracy > 90) {
    return new Date(baz + interval * 1.2);
  } else {
    return new Date(baz + interval / 1.2);
  }
};
