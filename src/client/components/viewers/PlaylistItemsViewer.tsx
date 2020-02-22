import React, { useCallback, useState } from "react";
import { Playlist, PlaylistItem } from "../../../shared/api/entities";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { Card, Table } from "../ui";
import { PlaylistItemsErrorBoundary } from "./PlaylistItemsErrorBoundry";
import { PlaylistItemViewer } from "./PlaylistItemViewer";

export const PlaylistItemsViewer = React.memo<{
  playlist: Playlist;
  sortedPlaylistItems: PlaylistItem[];
  onReload: () => void;
}>(({ playlist, sortedPlaylistItems, onReload }) => {
  const [isPlaylistPlayerOpen, onTogglePlaylistPlayer] = useToggleState();

  const [startIndex, setStartIndex] = useState(0);

  const onPartialPlay = useCallback(
    (nextStartIndex: number) => {
      setStartIndex(nextStartIndex);
      onTogglePlaylistPlayer();
    },
    [sortedPlaylistItems]
  );

  return (
    <Card>
      <PlaylistItemsErrorBoundary onReload={onReload}>
        <Table>
          {sortedPlaylistItems.map((playlistItem, index) => {
            return (
              <PlaylistItemViewer
                key={playlistItem.id}
                index={index}
                playlistItem={playlistItem}
                playlist={playlist}
                sortedPlaylistItems={sortedPlaylistItems}
                onPlay={onPartialPlay}
              />
            );
          })}
        </Table>
        <PlaylistPlayer
          playlistItems={sortedPlaylistItems}
          startIndex={startIndex}
          isOpen={isPlaylistPlayerOpen}
          onClose={onTogglePlaylistPlayer}
        />
      </PlaylistItemsErrorBoundary>
    </Card>
  );
});
