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
import { PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityViewer } from ".";
import { ExerciseSummary, Playlist, PlaylistItem } from "../../../shared/api/entities";
import { sortPlaylistItems } from "../../domain/playlist";
import { useSearch } from "../../hooks/search";
import { useToggleState } from "../dialogs";
import { PlaylistPlayer } from "../player/dialogs/PlaylistPlayer";
import { useStyles } from "../ui/styles";
import { PlaylistSummaryViewer } from "./PlaylistSummaryViewer";

export const PlaylistViewer = createEntityViewer<Playlist>(
  { entityType: "Playlist" },
  React.memo(({ entity: playlist, entityId: playlistId }) => {
    const classes = useStyles();

    const { entities: playlistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      playlistId
    });

    const [sortedPlaylistItems] = useState(sortPlaylistItems(playlistItems, playlist.orderBy));
    const [isPlaylistPlayerOpen, onTogglePlaylistPlayer] = useToggleState();

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" pb={1}>
          <Button className={classes.largeButton} variant="contained" color="primary" onClick={onTogglePlaylistPlayer}>
            <PlayArrow className={classes.leftIcon} />
            <Typography>始める</Typography>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <PlaylistSummaryViewer entityId={playlist.summaryId} />
        </Box>
        <Card>
          <Table>
            <TableBody>
              {sortedPlaylistItems.map(({ id: playlistItemId, exerciseSummaryId, memo }) => (
                <TableRow key={playlistItemId}>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      {exerciseSummaryId && <ExerciseTitleViewer entityId={exerciseSummaryId} />}
                      <Typography>{memo}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton>
                      <PlayArrow />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <PlaylistPlayer
          playlistItems={sortedPlaylistItems}
          isOpen={isPlaylistPlayerOpen}
          onClose={onTogglePlaylistPlayer}
        />
      </Box>
    );
  })
);

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
