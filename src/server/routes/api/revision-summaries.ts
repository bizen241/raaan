import { OperationFunction } from "express-openapi";
import { FindConditions, getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { RevisionSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { exerciseId, searchSort = "createdAt", searchOrder, searchLimit, searchOffset } = parseQuery(
    "RevisionSummary",
    req.query
  );

  const where: FindConditions<RevisionSummaryEntity> = {};
  if (exerciseId !== undefined) {
    where.revision = {
      exercise: {
        id: exerciseId
      }
    };
  }

  const query = getManager()
    .createQueryBuilder(RevisionSummaryEntity, "revisionSummary")
    .leftJoinAndSelect("revisionSummary.revision", "revision")
    .leftJoinAndSelect("revision.exercise", "exercise")
    .orderBy(`revision.${searchSort}`, searchOrder)
    .take(searchLimit)
    .skip(searchOffset);

  if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  const [revisionSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, revisionSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "RevisionSummary",
  permission: "Read",
  hasQuery: true
});
