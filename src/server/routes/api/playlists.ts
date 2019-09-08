import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Playlist } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { PlaylistEntity, PlaylistSummaryEntity, PlaylistTagEntity } from "../../database/entities";
import { normalizeTags } from "../../exercise";

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const params: SaveParams<Playlist> = req.body;

  await getManager().transaction(async manager => {
    const tags: PlaylistTagEntity[] = [];
    normalizeTags(params.tags).forEach(async tag => {
      tags.push(new PlaylistTagEntity(tag));
    });

    const playlistSummary = new PlaylistSummaryEntity(tags);
    const playlist = new PlaylistEntity(currentUser, playlistSummary, params);

    await manager.save(playlist);

    responseFindResult(req, res, playlist);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Playlist",
  summary: "Create a playlist",
  permission: "Read",
  hasBody: true
});
