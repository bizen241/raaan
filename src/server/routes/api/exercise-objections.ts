import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { ExerciseObjection } from "../../../shared/api/entities";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseSearchResult } from "../../api/response";
import { hasPermission } from "../../api/security";
import { ExerciseObjectionEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { objectorId, targetId, searchLimit, searchOffset } = parseQuery<ExerciseObjection>(
    "ExerciseObjection",
    req.query
  );

  const isOwn = objectorId === currentUser.id;
  if (!isOwn && !hasPermission(currentUser, "Admin")) {
    return next(createError(403));
  }

  const query = await getManager()
    .createQueryBuilder(ExerciseObjectionEntity, "exerciseObjection")
    .leftJoinAndSelect("exerciseObjection.target", "target")
    .take(searchLimit)
    .skip(searchOffset);

  if (objectorId !== undefined) {
    query.andWhere("target.authorId = :objectorId", { objectorId });
  }
  if (targetId !== undefined) {
    query.andWhere("exerciseObjection.targetId = :targetId", { targetId });
  }

  const [exerciseObjections, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseObjections, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "ExerciseObjection",
  permission: "Read",
  hasQuery: true
});
