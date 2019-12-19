import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Suggestion } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { SuggestionEntity } from "../../../database/entities";

export const PATCH: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { id: suggestionId }: PathParams = req.params;
  const params: Params<Suggestion> = req.body;

  await getManager().transaction(async manager => {
    const suggestion = await manager.findOne(SuggestionEntity, suggestionId, {
      relations: ["summary", "revision"]
    });
    if (suggestion === undefined) {
      throw createError(404);
    }

    const isAuthor = suggestion.authorId === currentUser.id;
    if (!isAuthor) {
      throw createError(403);
    }

    if (params.title !== undefined) {
      suggestion.title = params.title;
    }
    if (params.tags !== undefined) {
      suggestion.tags = params.tags;
    }
    if (params.questions !== undefined) {
      suggestion.questions = params.questions;
    }

    await manager.save(suggestion);

    responseFindResult(req, res, suggestion);
  });
});

PATCH.apiDoc = createOperationDoc({
  entityType: "Suggestion",
  permission: "Write",
  hasId: true,
  hasBody: true
});