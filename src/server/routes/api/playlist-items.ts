import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager, IsNull } from "typeorm";
import { PlaylistItem } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { ExerciseEntity, PlaylistEntity, PlaylistItemEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { playlistId, exerciseId, limit, offset } = parseSearchParams<PlaylistItem>("PlaylistItem", req.query);

  const manager = getManager();

  const query = await manager
    .createQueryBuilder(PlaylistItemEntity, "playlistItem")
    .leftJoinAndSelect("playlistItem.playlist", "playlist")
    .leftJoinAndSelect("playlistItem.exercise", "exercise")
    .take(limit)
    .skip(offset);

  if (playlistId !== undefined) {
    const playlist = await manager.findOne(PlaylistEntity, playlistId);
    if (playlist === undefined) {
      return next(createError(400));
    }

    const isAuthor = playlist.authorId === currentUser.id;
    if (playlist.isPrivate && !isAuthor) {
      return next(createError(403));
    }

    query.andWhere("playlist.id = :playlistId", { playlistId });
  } else {
    query.andWhere("playlist.isPrivate = false");
  }
  if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });
  }

  const [exerciseSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, exerciseSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Search exercises",
  permission: "Guest",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { playlistId, exerciseId, memo = "" }: SaveParams<PlaylistItem> = req.body;
  if (playlistId === undefined || exerciseId === undefined) {
    return next(createError(400));
  }

  await getManager().transaction(async manager => {
    const playlist = await manager.findOne(PlaylistEntity, playlistId);
    if (playlist === undefined) {
      return next(createError(400));
    }
    if (playlist.authorId !== currentUser.id) {
      return next(createError(403));
    }

    const exercise = await manager.findOne(ExerciseEntity, exerciseId);
    if (exercise === undefined) {
      return next(createError(400));
    }

    const newPlaylistItem = new PlaylistItemEntity(playlist, exercise, memo);

    await manager.save(newPlaylistItem);

    const lastPlaylistItem = await manager.findOne(PlaylistItemEntity, {
      next: IsNull()
    });

    if (lastPlaylistItem === undefined) {
      return responseFindResult(req, res, newPlaylistItem);
    }

    lastPlaylistItem.next = newPlaylistItem;

    await manager.save(lastPlaylistItem);

    responseFindResult(req, res, newPlaylistItem, lastPlaylistItem);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  summary: "Create a playlist item",
  permission: "Read",
  hasBody: true
});
