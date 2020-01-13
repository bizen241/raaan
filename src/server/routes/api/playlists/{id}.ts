import createError from "http-errors";
import { createDeleteOperation, createGetOperation, createPatchOperation } from "../../../api/operation";
import { hasPermission } from "../../../api/security";
import { PlaylistEntity } from "../../../database/entities";
import { getTags } from "../../../services/tags";

export const GET = createGetOperation("Playlist", "Guest", async ({ currentUser, manager, id }) => {
  const playlist = await manager.findOne(PlaylistEntity, id, {
    relations: ["summary", "author"]
  });
  if (playlist === undefined) {
    throw createError(404);
  }

  const isAuthor = playlist.authorId === currentUser.id;
  if (playlist.isPrivate && !isAuthor) {
    throw createError(403);
  }

  return [playlist];
});

export const PATCH = createPatchOperation("Playlist", "Read", async ({ currentUser, manager, id, params }) => {
  const playlist = await manager.findOne(PlaylistEntity, id, {
    relations: ["author", "summary", "summary.tags"]
  });
  if (playlist === undefined) {
    throw createError(404);
  }
  if (playlist.summary === undefined || playlist.summary.tags === undefined) {
    throw createError(500);
  }

  const isAuthor = playlist.authorId === currentUser.id;
  if (!isAuthor && !hasPermission(currentUser, "Admin")) {
    throw createError(403);
  }

  if (isAuthor) {
    if (params.title !== undefined) {
      playlist.title = params.title;
    }
    if (params.tags !== undefined) {
      playlist.summary.tags = await getTags(playlist.summary, params, manager);
    }
    if (params.description !== undefined) {
      playlist.description = params.description;
    }
    if (params.isPrivate !== undefined) {
      if (!playlist.isLocked) {
        playlist.isPrivate = params.isPrivate;
      }
    }
  } else {
    if (params.isLocked !== undefined) {
      playlist.isLocked = params.isLocked;

      if (params.isLocked) {
        playlist.isPrivate = true;
      }
    }
  }

  await manager.save(playlist);

  return [playlist];
});

export const DELETE = createDeleteOperation("Playlist", "Read", async ({ currentUser, manager, id }) => {
  const playlist = await manager.findOne(PlaylistEntity, id);
  if (playlist === undefined) {
    throw createError(404);
  }

  const isAuthor = playlist.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  await manager.remove(playlist);

  return [];
});
