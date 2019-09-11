import { Box, Card, CardContent } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { createEntityViewer } from ".";
import { Playlist, PlaylistItem } from "../../../shared/api/entities";
import { sortPlaylistItems } from "../../domain/playlist";
import { useSearch } from "../../hooks/search";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = createEntityViewer<Playlist>(
  "Playlist",
  React.memo(({ entity: playlist, entityId: playlistId }) => {
    const { entities: playlistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      playlistId
    });

    const [sortedPlaylistItems] = useState(sortPlaylistItems(playlistItems, playlist.orderBy));

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" pb={1}>
          <PlaylistSummaryViewer entityId={playlist.summaryId} />
        </Box>
        <Card>
          <CardContent>
            <pre>{JSON.stringify(sortedPlaylistItems, undefined, "  ")}</pre>
          </CardContent>
        </Card>
      </Box>
    );
  })
);
