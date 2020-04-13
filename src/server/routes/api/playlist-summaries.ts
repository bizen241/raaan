import { createSearchOperation } from "../../api/operation";
import { PlaylistSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("PlaylistSummary", "Guest", async ({ currentUser, manager, params }) => {
  const { authorId, tags } = params;

  const query = manager
    .createQueryBuilder(PlaylistSummaryEntity, "playlistSummary")
    .leftJoinAndSelect("playlistSummary.playlist", "playlist")
    .leftJoinAndSelect("playlistSummary.tags", "tags")
    .leftJoinAndSelect("playlist.author", "author");

  if (authorId !== undefined) {
    query.andWhere("author.id = :authorId", { authorId });
  }
  if (tags !== undefined) {
    query.innerJoinAndSelect("playlistSummary.tags", "searchTags", "searchTags.name IN (:...tags)", {
      tags: tags.split(/\s/),
    });
  }

  const isAuthor = authorId !== undefined && authorId === currentUser.id;
  if (!isAuthor) {
    query.andWhere("playlist.isPrivate = false");
  }

  return query;
});
