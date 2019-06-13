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
    .take(limit)
    .skip(offset);

  if (userId !== undefined) {
    query.leftJoin("submissionSummary.user", "user");
    query.andWhere("user.id = :userId", { userId });
  }
  if (exerciseId !== undefined) {
    query.leftJoin("submissionSummary.exercise", "exercise");
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  const result = await query.getManyAndCount();

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "SubmissionSummary",
  summary: "Search contents",
  permission: "Write",
  hasQuery: true
});
