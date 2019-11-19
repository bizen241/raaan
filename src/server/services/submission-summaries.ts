import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { SubmissionEntity, SubmissionSummaryEntity, UserEntity } from "../database/entities";

export const updateSubmissionSummarySubmitCount = async (params: {
  manager: EntityManager;
  currentUser: UserEntity;
  submission: SubmissionEntity;
}) => {
  const { manager, currentUser, submission } = params;
  const { exercise } = submission;
  if (exercise === undefined) {
    throw createError(500, "submission.exercise is not defined");
  }

  const submissionSummary = await manager.findOne(
    SubmissionSummaryEntity,
    {
      submitter: currentUser,
      exercise
    },
    { relations: ["exercise", "latest"] }
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
      throw createError(500, "submissionSummary.latest is not defined");
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
