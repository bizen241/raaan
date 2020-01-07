import { createSearchOperation } from "../../api/operation";
import { PlaylistDiaryEntryEntity } from "../../database/entities";

export const GET = createSearchOperation("PlaylistDiaryEntry", "Read", async ({ manager, params }) => {
  const { playlistId } = params;

  const query = manager
    .createQueryBuilder(PlaylistDiaryEntryEntity, "playlistDiaryEntry")
    .leftJoinAndSelect("playlistDiaryEntry.playlist", "playlist")
    .orderBy("playlistDiaryEntry.date", "DESC");

  if (playlistId !== undefined) {
    query.andWhere("playlist.id = :playlistId", { playlistId });
  }

  return query;
});
