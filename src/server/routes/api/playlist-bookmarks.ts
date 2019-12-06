import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { PlaylistBookmark } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { PlaylistBookmarkEntity, PlaylistEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { userId, playlistId, searchLimit, searchOffset } = parseQuery("PlaylistBookmark", req.query);

  const isOwn = userId === currentUser.id;

  const query = await getManager()
    .createQueryBuilder(PlaylistBookmarkEntity, "playlistBookmark")
    .take(searchLimit)
    .skip(searchOffset);

  if (userId !== undefined) {
    query.andWhere("playlistBookmark.userId = :userId", { userId });
  }
  if (playlistId !== undefined) {
    query.andWhere("playlistBookmark.playlistId = :playlistId", { playlistId });
  }
  if (!isOwn) {
    query.andWhere("playlistBookmark.isPrivate = true");
  }

  const [playlistBookmarks, count] = await query.getManyAndCount();

  responseSearchResult(req, res, playlistBookmarks, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "PlaylistBookmark",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { playlistId }: Params<PlaylistBookmark> = req.body;

  await getManager().transaction(async manager => {
    const playlist = await manager.findOne(PlaylistEntity, playlistId);
    if (playlist === undefined) {
      return next(createError(400));
    }

    const playlistBookmark = new PlaylistBookmarkEntity(currentUser, playlist, true);
    await manager.save(playlistBookmark);

    responseFindResult(req, res, playlistBookmark);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "PlaylistBookmark",
  permission: "Read",
  hasBody: true
});
