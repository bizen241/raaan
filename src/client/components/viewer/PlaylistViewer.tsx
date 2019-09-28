import { Box, Card, IconButton, Link, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { PlayArrow, Shuffle } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary, Playlist, PlaylistItem } from "../../../shared/api/entities";
import { randomizePlaylistItems, sortPlaylistItems } from "../../domain/playlist";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { Button, Column } from "../ui";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = withEntity<Playlist>({ entityType: "Playlist" })(
  React.memo(({ entity: playlist, entityId: playlistId }) => {
    const [isPlaylistPlayerOpen, onTogglePlaylistPlayer] = useToggleState();
    const [requestedPlaylistItems, requestPlaylistItems] = useState<PlaylistItem[]>([]);

    const { entities: playlistItems, count } = useSearch<PlaylistItem>("PlaylistItem", {
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
          <Table>
            <TableBody>
              {sortedPlaylistItems.map((playlistItem, index) => (
                <PlaylistItemViewer
                  key={playlistItem.id}
                  index={index}
                  playlistItem={playlistItem}
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

const PlaylistItemViewer = React.memo<{
  index: number;
  playlistItem: PlaylistItem;
  onPlay: (index: number) => void;
}>(({ index, playlistItem, onPlay }) => {
  const { exerciseSummaryId, memo } = playlistItem;

  return (
    <TableRow>
      <TableCell>
        <Column>
          {exerciseSummaryId && <ExerciseTitleViewer entityId={exerciseSummaryId} />}
          <Typography>{memo}</Typography>
        </Column>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={useCallback(() => onPlay(index), [index])}>
          <PlayArrow />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

const ExerciseTitleViewer = withEntity<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    return (
      <Box>
        <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}`}>
          <Typography>{exerciseSummary.title}</Typography>
        </Link>
      </Box>
    );
  })
);
