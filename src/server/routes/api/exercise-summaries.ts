import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { ExerciseSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { authorId, tags, isEditing, searchLimit, searchOffset } = parseQuery("ExerciseSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(ExerciseSummaryEntity, "exerciseSummary")
    .leftJoinAndSelect("exerciseSummary.exercise", "exercise")
    .leftJoinAndSelect("exerciseSummary.tags", "tags")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.draft", "draft")
    .take(searchLimit)
    .skip(searchOffset);

  if (authorId !== undefined) {
    query.andWhere("author.id = :authorId", { authorId });
  }
  if (tags !== undefined) {
    query.innerJoinAndSelect("exerciseSummary.tags", "searchTags", "searchTags.name IN (:...tags)", {
      tags: tags.split(/\s/)
    });
  }
  if (isEditing !== undefined) {
    query.andWhere("draft.isMerged = :isMerged", { isMerged: !isEditing });
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
  permission: "Guest",
  hasQuery: true
});
