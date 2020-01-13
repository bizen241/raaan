import createError from "http-errors";
import { createPostOperation, createSearchOperation } from "../../api/operation";
import { PlaylistBookmarkEntity, PlaylistEntity } from "../../database/entities";

export const GET = createSearchOperation("PlaylistBookmark", "Read", async ({ currentUser, manager, params }) => {
  const { userId, playlistId } = params;

  const isOwn = userId === currentUser.id;

  const query = manager.createQueryBuilder(PlaylistBookmarkEntity, "playlistBookmark");

  if (userId !== undefined) {
    query.andWhere("playlistBookmark.userId = :userId", { userId });
  }
  if (playlistId !== undefined) {
    query.andWhere("playlistBookmark.playlistId = :playlistId", { playlistId });
  }
  if (!isOwn) {
    query.andWhere("playlistBookmark.isPrivate = true");
  }

  return query;
});

export const POST = createPostOperation("PlaylistBookmark", "Read", async ({ currentUser, manager, params }) => {
  const { playlistId } = params;
  if (playlistId === undefined) {
    throw createError(400);
  }

  const playlist = await manager.findOne(PlaylistEntity, playlistId);
  if (playlist === undefined) {
    throw createError(400);
  }

  const playlistBookmark = new PlaylistBookmarkEntity(currentUser, playlist, true);
  await manager.save(playlistBookmark);

  return [playlistBookmark];
});
