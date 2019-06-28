import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { SubmissionSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { SubmissionSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { userId, exerciseId, limit, offset } = parseSearchParams<SubmissionSummary>("SubmissionSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(SubmissionSummaryEntity, "submissionSummary")
    .leftJoinAndSelect("submissionSummary.user", "user")
    .leftJoinAndSelect("submissionSummary.exercise", "exercise")
    .leftJoinAndSelect("submissionSummary.latest", "latest")
    .leftJoinAndSelect("submissionSummary.best", "best")
    .leftJoinAndSelect("exercise.summary", "summary")
    .take(limit)
    .skip(offset);

  if (userId !== undefined) {
    query.andWhere("user.id = :userId", { userId });
  }
  if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  const [submissionSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, submissionSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "SubmissionSummary",
  summary: "Search contents",
  permission: "Write",
  hasQuery: true
});
