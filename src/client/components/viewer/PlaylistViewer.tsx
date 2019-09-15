import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import { PlayArrow, Shuffle } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { ExerciseSummary, Playlist, PlaylistItem } from "../../../shared/api/entities";
import { randomizePlaylistItems, sortPlaylistItems } from "../../domain/playlist";
import { useSearch } from "../../hooks/search";
import { useToggleState } from "../dialogs";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { useStyles } from "../ui/styles";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = createEntityViewer<Playlist>(
  { entityType: "Playlist" },
  React.memo(({ entity: playlist, entityId: playlistId }) => {
    const classes = useStyles();

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
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            disabled={count === 0}
            onClick={onPlay}
          >
            <PlayArrow className={classes.leftIcon} />
            <Typography>始める</Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Button className={classes.largeButton} variant="contained" disabled={count === 0} onClick={onRandomPlay}>
            <Shuffle className={classes.leftIcon} />
            <Typography>ランダム</Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <PlaylistSummaryViewer entityId={playlist.summaryId} />
        </Box>
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
      </Box>
    );
  })
);

const PlaylistItemViewer = React.memo<{
  index: number;
  playlistItem: PlaylistItem;
  onPlay: (index: number) => void;
}>(({ index, playlistItem, onPlay }) => {
  const { id: playlistItemId, exerciseSummaryId, memo } = playlistItem;

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" flexDirection="column">
          {exerciseSummaryId && <ExerciseTitleViewer entityId={exerciseSummaryId} />}
          <Typography>{memo}</Typography>
        </Box>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={useCallback(() => onPlay(index), [index])}>
          <PlayArrow />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

const ExerciseTitleViewer = createEntityViewer<ExerciseSummary>(
  { entityType: "ExerciseSummary" },
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
