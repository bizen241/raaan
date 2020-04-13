import createError from "http-errors";
import { createDeleteOperation, createPatchOperation } from "../../../api/operation";
import { PlaylistItemEntity } from "../../../database/entities";

export const PATCH = createPatchOperation("PlaylistItem", "Read", async ({ currentUser, manager, id, params }) => {
  const playlistItem = await manager.findOne(PlaylistItemEntity, id, {
    relations: ["playlist", "next", "exercise"],
  });
  if (playlistItem === undefined) {
    throw createError(404);
  }
  if (playlistItem.playlist === undefined || playlistItem.next === undefined) {
    throw createError(500);
  }

  const isAuthor = playlistItem.playlist.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  if (params.memo !== undefined) {
    playlistItem.memo = params.memo;

    await manager.save(playlistItem);

    return [playlistItem];
  }

  const updatedItems: PlaylistItemEntity[] = [];

  const oldNextItem = playlistItem.next;

  playlistItem.next = null;
  await manager.save(playlistItem);

  const oldPrevItem = await manager.findOne(PlaylistItemEntity, {
    where: {
      next: {
        id: playlistItem.id,
      },
    },
    relations: ["exercise"],
  });
  if (oldPrevItem !== undefined) {
    oldPrevItem.next = oldNextItem;

    updatedItems.push(oldPrevItem);
    await manager.save(oldPrevItem);
  }

  const newPrevItem = await manager.findOne(PlaylistItemEntity, {
    where: {
      next: {
        id: params.nextId,
      },
    },
    relations: ["exercise"],
  });
  if (newPrevItem !== undefined) {
    newPrevItem.next = playlistItem;

    updatedItems.push(newPrevItem);
    await manager.save(newPrevItem);
  }

  if (params.nextId === undefined) {
    playlistItem.next = null;
  } else {
    const newNextItem = await manager.findOne(PlaylistItemEntity, params.nextId, {
      relations: ["exercise"],
    });
    if (newNextItem === undefined) {
      throw createError(400);
    }

    playlistItem.next = newNextItem;
  }

  updatedItems.push(playlistItem);
  await manager.save(playlistItem);

  return updatedItems;
});

export const DELETE = createDeleteOperation("PlaylistItem", "Read", async ({ currentUser, manager, id }) => {
  const playlistItem = await manager.findOne(PlaylistItemEntity, id, {
    relations: ["playlist", "playlist.author", "next"],
  });
  if (playlistItem === undefined) {
    throw createError(404);
  }
  if (playlistItem.playlist === undefined) {
    throw createError(500);
  }

  const isAuthor = playlistItem.playlist.authorId === currentUser.id;
  if (!isAuthor) {
    throw createError(403);
  }

  const nextItem = playlistItem.next;

  const prevItem = await manager
    .createQueryBuilder(PlaylistItemEntity, "playlistItem")
    .leftJoinAndSelect("playlistItem.exercise", "exercise")
    .andWhere("playlistItem.nextId = :nextId", { nextId: id })
    .getOne();

  await manager.remove(playlistItem);

  if (prevItem !== undefined) {
    prevItem.next = nextItem;
    await manager.save(prevItem);

    return [prevItem];
  } else {
    return [];
  }
});
