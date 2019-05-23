import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ExerciseSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { ExerciseSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { tags, limit, offset } = parseSearchParams<ExerciseSummary>("ExerciseSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(ExerciseSummaryEntity, "exerciseSummary")
    .leftJoinAndSelect("exerciseSummary.exercise", "exercise")
    .leftJoinAndSelect("exerciseSummary.tags", "tags")
    .leftJoinAndSelect("exercise.author", "author")
    .take(limit)
    .skip(offset);

  if (tags !== undefined) {
    query.innerJoin("exerciseSummary.tags", "tags", "tags.name IN (:...tags)", { tags });
  }

  const result = await query.getManyAndCount();

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseSummary",
  summary: "Search contents",
  permission: "Guest",
  hasQuery: true
});
