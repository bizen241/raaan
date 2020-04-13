import createError from "http-errors";
import { createPostOperation } from "../../api/operation";
import { ExerciseEntity, PlaylistEntity, PlaylistItemEntity, PlaylistSummaryEntity } from "../../database/entities";
import { getTags } from "../../services/tags";

export const POST = createPostOperation("Playlist", "Read", async ({ currentUser, manager, params }) => {
  const { exerciseId } = params;
  if (exerciseId === undefined) {
    throw createError(400);
  }

  const playlistSummary = new PlaylistSummaryEntity();
  playlistSummary.tags = await getTags(playlistSummary, params, manager);

  const playlist = new PlaylistEntity(currentUser, playlistSummary, params);
  await manager.save(playlist);

  const exercise = await manager.findOne(ExerciseEntity, exerciseId);
  if (exercise === undefined) {
    throw createError(400);
  }

  const playlistItem = new PlaylistItemEntity(playlist, exercise, "");
  await manager.save(playlistItem);

  const savedPlaylist = await manager.findOne(PlaylistEntity, exercise.id, {
    relations: ["summary", "author"],
  });
  if (savedPlaylist === undefined) {
    throw createError(500);
  }

  return [savedPlaylist, playlistItem];
});
