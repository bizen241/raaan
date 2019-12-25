import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Suggestion } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { RevisionEntity, SuggestionEntity, SuggestionSummaryEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const params: Params<Suggestion> = req.body;
  const { revisionId, message = "" } = params;
  if (revisionId === undefined) {
    throw createError(400);
  }

  await getManager().transaction(async manager => {
    const revision = await manager.findOne(RevisionEntity, revisionId);
    if (revision === undefined) {
      throw createError(400);
    }

    const suggestionSummary = new SuggestionSummaryEntity();

    const suggestion = new SuggestionEntity(suggestionSummary, currentUser, revision, params, message);
    await manager.save(suggestion);

    responseFindResult(req, res, suggestion);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Suggestion",
  permission: "Write",
  hasBody: true
});
