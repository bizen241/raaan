import { Typography } from "@material-ui/core";
import { Delete, PlayArrow, SwapVert } from "@material-ui/icons";
import React, { useCallback } from "react";
import { Playlist, PlaylistItem } from "../../../shared/api/entities";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistItemDialog } from "../dialogs/playlist-items/DeletePlaylistItemDialog";
import { MovePlaylistItemDialog } from "../dialogs/playlist-items/MovePlaylistItemDialog";
import { Column, IconButton, Menu, MenuItem, TableRow } from "../ui";
import { PlaylistItemExerciseSummaryViewer } from "./PlaylistItemExerciseSummaryViewer";

export const PlaylistItemViewer = React.memo<{
  index: number;
  playlistItem: PlaylistItem;
  playlist: Playlist;
  sortedPlaylistItems: PlaylistItem[];
  onPlay: (index: number) => void;
}>(({ index, playlistItem, playlist, sortedPlaylistItems, onPlay }) => {
  const { exerciseSummaryId, memo } = playlistItem;

  const [isMoveDialogOpen, onToggleMoveDialog] = useToggleState();
  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  return (
    <TableRow>
      <Column flex={1}>
        {exerciseSummaryId ? (
          <PlaylistItemExerciseSummaryViewer exerciseSummaryId={exerciseSummaryId} />
        ) : (
          <Typography>削除されました</Typography>
        )}
        <Typography>{memo}</Typography>
      </Column>
      <Column>
        <IconButton icon={PlayArrow} onClick={useCallback(() => onPlay(index), [index])} />
      </Column>
      <Column>
        <Menu>
          <MenuItem icon={<SwapVert />} label="移動" onClick={onToggleMoveDialog} />
          <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
        </Menu>
      </Column>
      <MovePlaylistItemDialog
        playlistItemId={playlistItem.id}
        playlist={playlist}
        playlistItems={sortedPlaylistItems}
        isOpen={isMoveDialogOpen}
        onClose={onToggleMoveDialog}
      />
      <DeletePlaylistItemDialog
        playlistItemId={playlistItem.id}
        isOpen={isDeleteDialogOpen}
        onClose={onToggleDeleteDialog}
      />
    </TableRow>
  );
});
