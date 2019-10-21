import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { PlaylistBookmark } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { PlaylistBookmarkEntity, PlaylistEntity } from "../../database/entities";

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { playlistId, memo = "" }: Params<PlaylistBookmark> = req.body;

  await getManager().transaction(async manager => {
    const playlist = await manager.findOne(PlaylistEntity, playlistId);
    if (playlist === undefined) {
      return next(createError(400));
    }

    const playlistBookmark = new PlaylistBookmarkEntity(currentUser, playlist, memo);
    await manager.save(playlistBookmark);

    responseFindResult(req, res, playlistBookmark);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "PlaylistBookmark",
  summary: "Create a bookmark",
  permission: "Read",
  hasBody: true
});
