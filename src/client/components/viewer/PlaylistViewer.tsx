import { Card, CardContent, Divider, IconButton, Table, TableBody } from "@material-ui/core";
import { PlayArrow, Refresh, Shuffle } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Playlist, PlaylistItem } from "../../../shared/api/entities";
import { randomizePlaylistItems, sortPlaylistItems } from "../../domain/playlist";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { Button, Column, Row } from "../ui";
import { PlaylistItemViewer } from "./PlaylistItemViewer";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = withEntity<Playlist>({ entityType: "Playlist" })(
  React.memo(({ entity: playlist, entityId: playlistId }) => {
    const [isPlaylistPlayerOpen, onTogglePlaylistPlayer] = useToggleState();
    const [requestedPlaylistItems, requestPlaylistItems] = useState<PlaylistItem[]>([]);

    const { entities: playlistItems, count, onReload } = useSearch<PlaylistItem>("PlaylistItem", {
      playlistId
    });
    const sortedPlaylistItems = useMemo(() => sortPlaylistItems(playlistItems, playlist.orderBy), [playlistItems]);

    const onPlay = useCallback(() => {
      requestPlaylistItems(sortedPlaylistItems);
      onTogglePlaylistPlayer();
    }, [sortedPlaylistItems]);
    const onPartialPlay = useCallback(
      (startIndex: number) => {
        requestPlaylistItems(sortedPlaylistItems.slice(startIndex));
        onTogglePlaylistPlayer();
      },
      [sortedPlaylistItems]
    );
    const onRandomPlay = useCallback(() => {
      requestPlaylistItems(randomizePlaylistItems(sortedPlaylistItems));
      onTogglePlaylistPlayer();
    }, [sortedPlaylistItems]);

    return (
      <Column>
        <Column pb={1}>
          <Button color="primary" icon={<PlayArrow />} label="始める" disabled={count === 0} onClick={onPlay} />
        </Column>
        <Column pb={1}>
          <Button icon={<Shuffle />} label="ランダム" disabled={count === 0} onClick={onRandomPlay} />
        </Column>
        <Column pb={1}>
          <PlaylistSummaryViewer entityId={playlist.summaryId} />
        </Column>
        <Card>
          <CardContent>
            <Column>
              <Row>
                <IconButton onClick={onReload}>
                  <Refresh />
                </IconButton>
              </Row>
            </Column>
          </CardContent>
          <Divider />
          <Table>
            <TableBody>
              {sortedPlaylistItems.map((playlistItem, index) => (
                <PlaylistItemViewer
                  key={playlistItem.id}
                  index={index}
                  playlistItem={playlistItem}
                  playlistId={playlistId}
                  playlist={playlist}
                  playlistItems={playlistItems}
                  onPlay={onPartialPlay}
                />
              ))}
            </TableBody>
          </Table>
        </Card>
        <PlaylistPlayer
          playlistItems={requestedPlaylistItems}
          isOpen={isPlaylistPlayerOpen}
          onClose={onTogglePlaylistPlayer}
        />
      </Column>
    );
  })
);
