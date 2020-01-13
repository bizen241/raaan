import createError from "http-errors";
import { createSearchOperation } from "../../api/operation";
import { SubmissionSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("SubmissionSummary", "Read", async ({ currentUser, manager, params }) => {
  const { submitterId, exerciseId, searchSort = "createdAt", searchOrder } = params;

  const isOwnSubmissions = submitterId === currentUser.id;
  if (!isOwnSubmissions) {
    throw createError(403);
  }

  const query = manager
    .createQueryBuilder(SubmissionSummaryEntity, "submissionSummary")
    .leftJoinAndSelect("submissionSummary.submitter", "submitter")
    .leftJoinAndSelect("submissionSummary.exercise", "exercise")
    .leftJoinAndSelect("submissionSummary.latest", "latest")
    .leftJoinAndSelect("exercise.summary", "summary")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.draft", "draft")
    .orderBy(`submissionSummary.${searchSort}`, searchOrder);

  if (submitterId !== undefined) {
    query.andWhere("submitter.id = :submitterId", { submitterId });
  }
  if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  return query;
});
