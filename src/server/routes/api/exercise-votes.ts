import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { ExerciseEntity, ExerciseVoteEntity } from "../../database/entities";

export const GET = createSearchOperation("ExerciseVote", "Read", async ({ currentUser, manager, params }) => {
  const { voterId, targetId, isUp } = params;

  const isVoter = voterId === currentUser.id;
  if (!isVoter) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(ExerciseVoteEntity, "exerciseVote")
    .leftJoinAndSelect("exerciseVote.target", "target")
    .leftJoinAndSelect("exerciseVote.voter", "voter");

  if (voterId !== undefined) {
    query.andWhere("exerciseVote.voterId = :voterId", { voterId });
  }
  if (targetId !== undefined) {
    query.andWhere("exerciseVote.targetId = :targetId", { targetId });
  }
  if (isUp !== undefined) {
    query.andWhere("exerciseVote.isUp = :isUp", { isUp });
  }

  return query;
});

export const POST = createPostOperation("ExerciseVote", "Write", async ({ currentUser, manager, params }) => {
  const { targetId, isUp = true } = params;

  const target = await manager.findOne(ExerciseEntity, targetId, {
    relations: ["author", "summary", "summary.tags", "draft"]
  });
  if (target === undefined) {
    throw createError(404);
  }
  if (target.summary === undefined) {
    throw createError(500);
  }

  const exerciseVote = new ExerciseVoteEntity(target, currentUser, isUp);
  await manager.save(exerciseVote);

  if (isUp) {
    target.summary.upvoteCount += 1;
  } else {
    target.summary.downvoteCount += 1;
  }
  await manager.save(target.summary);

  return [exerciseVote, target.summary];
});
