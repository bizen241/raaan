import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { PlaylistBookmarkEntity } from "../../../database/entities";

export const DELETE: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: playlistBookmarkId }: PathParams = req.params;

  await getManager().transaction(async manager => {
    const playlistBookmark = await manager.findOne(PlaylistBookmarkEntity, playlistBookmarkId);
    if (playlistBookmark === undefined) {
      return next(createError(404));
    }

    const isOwn = playlistBookmark.userId === currentUser.id;
    if (!isOwn) {
      return next(createError(403));
    }

    await manager.remove(playlistBookmark);

    responseFindResult(req, res);
  });
});

DELETE.apiDoc = createOperationDoc({
  entityType: "PlaylistBookmark",
  summary: "Delete a bookmark",
  permission: "Read",
  hasId: true
});
