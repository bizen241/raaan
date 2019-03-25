import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { ExerciseEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { tagIds, limit, offset } = parseSearchParams<Exercise>("Exercise", req.query);

  const query = await getManager()
    .createQueryBuilder(ExerciseEntity, "content")
    .loadAllRelationIds({
      relations: ["author", "latest"]
    })
    .take(limit)
    .skip(offset);

  if (tagIds !== undefined) {
    query.innerJoin("content.tags", "tags", "tags.id IN (:...tagIds)", { tagIds: [] });
  }

  const result = await query.getManyAndCount();

  responseSearchResult(res, ...result);
});

GET.apiDoc = createOperationDoc({
  entityType: "Exercise",
  summary: "Search contents",
  permission: "Guest",
  hasQuery: true
});
