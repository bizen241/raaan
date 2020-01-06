import * as createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { ExerciseEntity, SubmissionEntity } from "../../database/entities";
import { updateContestEntry } from "../../services/contest-entries";
import { updateRelatedEntities } from "../../services/submissions";

export const POST = createPostOperation("Submission", "Read", async ({ currentUser, manager, params }) => {
  const { exerciseId, contestId, typeCount, time, accuracy } = params;
  if (exerciseId === undefined || typeCount === undefined || time === undefined || accuracy === undefined) {
    throw createError(400);
  }

  const exercise = await manager.findOne(ExerciseEntity, exerciseId, {
    relations: ["author", "summary", "latest", "draft"]
  });
  if (exercise === undefined) {
    throw createError(400);
  }
  if (exercise.author === undefined || exercise.summary === undefined) {
    throw createError(500);
  }

  if (typeCount > exercise.summary.maxTypeCount) {
    throw createError(400);
  }

  const submission = await manager.save(
    new SubmissionEntity(currentUser, exercise, {
      typeCount,
      time,
      accuracy
    })
  );

  const updatedEntities = await updateRelatedEntities({
    manager,
    currentUser,
    submission
  });

  if (contestId !== undefined) {
    const contestEntry = await updateContestEntry({
      manager,
      currentUser,
      submission,
      contestId
    });

    updatedEntities.push(contestEntry);
  }

  return updatedEntities;
});
