import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ExerciseSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { ExerciseSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { authorId, tags, limit, offset } = parseSearchParams<ExerciseSummary>("ExerciseSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(ExerciseSummaryEntity, "exerciseSummary")
    .leftJoinAndSelect("exerciseSummary.exercise", "exercise")
    .leftJoinAndSelect("exercise.author", "author")
    .take(limit)
    .skip(offset);

  if (authorId !== undefined) {
    query.andWhere("author.id = :authorId", { authorId });
  }
  if (authorId === undefined || authorId !== currentUser.id) {
    query.andWhere("exercise.isPrivate = false");
  }
  if (tags !== undefined) {
    query.innerJoinAndSelect("exerciseSummary.tags", "tags", "tags.name IN (:...tags)", { tags });
  } else {
    query.leftJoinAndSelect("exerciseSummary.tags", "tags");
  }

  const result = await query.getManyAndCount();

  responseSearchResult(req, res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseSummary",
  summary: "Search contents",
  permission: "Guest",
  hasQuery: true
});
