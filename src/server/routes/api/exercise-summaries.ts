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
  if (tags !== undefined) {
    query.innerJoinAndSelect("exerciseSummary.tags", "tags", "tags.name IN (:...tags)", { tags });
  } else {
    query.leftJoinAndSelect("exerciseSummary.tags", "tags");
  }

  const isAuthor = authorId !== undefined && authorId === currentUser.id;
  if (!isAuthor) {
    query.andWhere("exercise.isPrivate = false");
  }

  const [exerciseSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseSummary",
  summary: "Search exercises",
  permission: "Guest",
  hasQuery: true
});
