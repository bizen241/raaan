import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ExerciseSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { ExerciseEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { tags, limit, offset } = parseSearchParams<ExerciseSummary>("ExerciseSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(ExerciseEntity, "exercise")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.detail", "detail")
    .leftJoinAndSelect("exercise.tags", "tags")
    .take(limit)
    .skip(offset);

  if (tags !== undefined) {
    query.innerJoin("exercise.tags", "tags", "tags.name IN (:...tags)", { tags });
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
