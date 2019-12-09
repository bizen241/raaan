import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { PlaylistItem } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { ExerciseEntity, PlaylistEntity, PlaylistItemEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { authorId, playlistId, exerciseId, searchLimit, searchOffset } = parseQuery("PlaylistItem", req.query);

  const manager = getManager();

  const query = manager
    .createQueryBuilder(PlaylistItemEntity, "playlistItem")
    .leftJoinAndSelect("playlistItem.playlist", "playlist")
    .leftJoinAndSelect("playlistItem.exercise", "exercise")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.draft", "draft")
    .leftJoinAndSelect("exercise.summary", "summary")
    .take(searchLimit)
    .skip(searchOffset);

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
  } else if (exerciseId !== undefined) {
    query.andWhere("exercise.id = :exerciseId", { exerciseId });

    if (authorId !== undefined && authorId === currentUser.id) {
      query.andWhere("playlist.authorId = :authorId", { authorId });
    } else {
      query.andWhere("playlist.isPrivate = false");
    }
  } else {
    return next(createError(400));
  }

  const [playlistItems, count] = await query.getManyAndCount();

  responseSearchResult(req, res, playlistItems, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  permission: "Guest",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { playlistId, exerciseId, memo = "" }: Params<PlaylistItem> = req.body;
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

    const playlistItems = await manager.find(PlaylistItemEntity, {
      playlist: {
        id: playlistId
      }
    });

    await manager.save(newPlaylistItem);

    if (playlistItems.length === 0) {
      return responseFindResult(req, res, newPlaylistItem);
    }

    const lastPlaylistItem = playlistItems.find(playlistItem => playlistItem.nextId === undefined);
    if (lastPlaylistItem === undefined) {
      return next(createError(500));
    }
    lastPlaylistItem.next = newPlaylistItem;

    await manager.save(lastPlaylistItem);

    const savedPlaylistItem = await manager.findOne(PlaylistItemEntity, newPlaylistItem.id, {
      relations: ["exercise"]
    });
    const updatedPlaylistItem = await manager.findOne(PlaylistItemEntity, lastPlaylistItem.id, {
      relations: ["exercise"]
    });
    if (savedPlaylistItem === undefined || updatedPlaylistItem === undefined) {
      return next(createError(500));
    }

    responseFindResult(req, res, savedPlaylistItem, updatedPlaylistItem);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "PlaylistItem",
  permission: "Read",
  hasBody: true
});
