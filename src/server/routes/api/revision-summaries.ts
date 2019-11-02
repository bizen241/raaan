import { OperationFunction } from "express-openapi";
import { FindConditions, getManager } from "typeorm";
import { RevisionSummary } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { RevisionSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { exerciseId, searchLimit, searchOffset } = parseQuery<RevisionSummary>("RevisionSummary", req.query);

  const where: FindConditions<RevisionSummaryEntity> = {};
  if (exerciseId !== undefined) {
    where.revision = {
      exercise: {
        id: exerciseId
      }
    };
  }

  const query = await getManager()
    .createQueryBuilder(RevisionSummaryEntity, "revisionSummary")
    .leftJoinAndSelect("revisionSummary.revision", "revision")
    .leftJoinAndSelect("revision.exercise", "exercise")
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
