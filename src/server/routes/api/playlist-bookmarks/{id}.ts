import * as createError from "http-errors";
import { createDeleteOperation } from "../../../api/operation";
import { PlaylistBookmarkEntity } from "../../../database/entities";

export const DELETE = createDeleteOperation("PlaylistBookmark", "Read", async ({ currentUser, manager, id }) => {
  const playlistBookmark = await manager.findOne(PlaylistBookmarkEntity, id);
  if (playlistBookmark === undefined) {
    throw createError(404);
  }

  const isOwn = playlistBookmark.userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  await manager.remove(playlistBookmark);

  return [];
});
