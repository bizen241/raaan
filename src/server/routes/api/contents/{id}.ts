import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { ContentEntity } from "../../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: contentId }: PathParams = req.params;

  const loadedContent = await getManager().findOne(ContentEntity, contentId, {
    relations: ["owner", "latest", "tags"]
  });
  if (loadedContent === undefined) {
    return next(createError(404));
  }

  responseFindResult(res, loadedContent);
});

GET.apiDoc = createOperationDoc({
  summary: "Get a content",
  tag: "contents",
  permission: "Guest",
  path: ["id"]
});

export const DELETE: OperationFunction = errorBoundary(async (req, res, next) => {
  const { id: contentId }: PathParams = req.params;

  const manager = getManager();

  const loadedContent = await manager.findOne(ContentEntity, contentId, {
    relations: ["owner", "latest", "tags"]
  });
  if (loadedContent === undefined) {
    return next(createError(404));
  }

  await manager.remove(loadedContent);

  responseFindResult(res);
});

DELETE.apiDoc = createOperationDoc({
  summary: "Delete a content",
  tag: "contents",
  permission: "Admin",
  path: ["id"]
});
