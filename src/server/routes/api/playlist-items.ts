import * as createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { ExerciseEntity, PlaylistEntity, PlaylistItemEntity } from "../../database/entities";

export const GET = createSearchOperation("PlaylistItem", "Guest", async ({ currentUser, manager, params }) => {
  const { authorId, playlistId, exerciseId } = params;

  const query = manager
    .createQueryBuilder(PlaylistItemEntity, "playlistItem")
    .leftJoinAndSelect("playlistItem.playlist", "playlist")
    .leftJoinAndSelect("playlistItem.exercise", "exercise")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.draft", "draft")
    .leftJoinAndSelect("exercise.summary", "summary");

  if (playlistId !== undefined) {
    const playlist = await manager.findOne(PlaylistEntity, playlistId);
    if (playlist === undefined) {
      throw createError(400);
    }

    const isAuthor = playlist.authorId === currentUser.id;
    if (playlist.isPrivate && !isAuthor) {
      throw createError(403);
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
    throw createError(400);
  }

  return query;
});

export const POST = createPostOperation("PlaylistItem", "Read", async ({ currentUser, manager, params }) => {
  const { playlistId, exerciseId, memo = "" } = params;
  if (playlistId === undefined || exerciseId === undefined) {
    throw createError(400);
  }

  const playlist = await manager.findOne(PlaylistEntity, playlistId);
  if (playlist === undefined) {
    throw createError(400);
  }
  if (playlist.authorId !== currentUser.id) {
    throw createError(403);
  }

  const exercise = await manager.findOne(ExerciseEntity, exerciseId);
  if (exercise === undefined) {
    throw createError(400);
  }

  const newPlaylistItem = new PlaylistItemEntity(playlist, exercise, memo);

  const playlistItems = await manager.find(PlaylistItemEntity, {
    playlist: {
      id: playlistId
    }
  });

  await manager.save(newPlaylistItem);

  if (playlistItems.length === 0) {
    return [newPlaylistItem];
  }

  const lastPlaylistItem = playlistItems.find(playlistItem => playlistItem.nextId === undefined);
  if (lastPlaylistItem === undefined) {
    throw createError(500);
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
    throw createError(500);
  }

  return [savedPlaylistItem, updatedPlaylistItem];
});
