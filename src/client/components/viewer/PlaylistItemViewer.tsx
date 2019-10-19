import { Box, IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete, PlayArrow, SwapVert } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary, Playlist, PlaylistItem } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistItemDialog } from "../dialogs/playlists/DeletePlaylistItemDialog";
import { MovePlaylistItemDialog } from "../dialogs/playlists/MovePlaylistItemDialog";
import { Column, Menu, MenuItem } from "../ui";

export const PlaylistItemViewer = React.memo<{
  index: number;
  playlistItem: PlaylistItem;
  playlistId: string;
  playlist: Playlist;
  playlistItems: PlaylistItem[];
  onPlay: (index: number) => void;
}>(({ index, playlistItem, playlistId, playlist, playlistItems, onPlay }) => {
  const { exerciseSummaryId, memo } = playlistItem;

  const [isMoveDialogOpen, onToggleMoveDialog] = useToggleState();
  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

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
      <TableCell padding="checkbox">
        <Menu>
          <MenuItem icon={<SwapVert />} label="移動" onClick={onToggleMoveDialog} />
          <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
        </Menu>
      </TableCell>
      <MovePlaylistItemDialog
        playlistItemId={playlistItem.id}
        playlistId={playlistId}
        playlist={playlist}
        playlistItems={playlistItems}
        isOpen={isMoveDialogOpen}
        onClose={onToggleMoveDialog}
      />
      <DeletePlaylistItemDialog
        playlistItemId={playlistItem.id}
        playlistId={playlistId}
        isOpen={isDeleteDialogOpen}
        onClose={onToggleDeleteDialog}
      />
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
