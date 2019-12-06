import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { parseQuery } from "../../../shared/api/request/parse";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseSearchResult } from "../../api/response";
import { PlaylistSummaryEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { authorId, tags, searchLimit, searchOffset } = parseQuery("PlaylistSummary", req.query);

  const query = await getManager()
    .createQueryBuilder(PlaylistSummaryEntity, "playlistSummary")
    .leftJoinAndSelect("playlistSummary.playlist", "playlist")
    .leftJoinAndSelect("playlistSummary.tags", "tags")
    .leftJoinAndSelect("playlist.author", "author")
    .take(searchLimit)
    .skip(searchOffset);

  if (authorId !== undefined) {
    query.andWhere("author.id = :authorId", { authorId });
  }
  if (tags !== undefined) {
    query.innerJoinAndSelect("playlistSummary.tags", "searchTags", "searchTags.name IN (:...tags)", {
      tags: tags.split(/\s/)
    });
  }

  const isAuthor = authorId !== undefined && authorId === currentUser.id;
  if (!isAuthor) {
    query.andWhere("playlist.isPrivate = false");
  }

  const [playlistSummaries, count] = await query.getManyAndCount();

  responseSearchResult(req, res, playlistSummaries, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "PlaylistSummary",
  permission: "Guest",
  hasQuery: true
});
