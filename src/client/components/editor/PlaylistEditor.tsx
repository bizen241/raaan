import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import * as React from "react";
import { useMemo } from "react";
import { ExerciseSummary, Playlist, PlaylistItem } from "../../../shared/api/entities";
import { sortPlaylistItems } from "../../domain/playlist";
import { withEntity } from "../../enhancers/withEntity";
import { useSearch } from "../../hooks/useSearch";
import { useToggleState } from "../../hooks/useToggleState";
import { DeletePlaylistItemDialog } from "../dialogs/DeletePlaylistItemDialog";

export const PlaylistEditor = withEntity<Playlist>({ entityType: "Playlist" })(
  React.memo(({ entityId: playlistId, entity: playlist }) => {
    const { entities: playlistItems } = useSearch<PlaylistItem>("PlaylistItem", {
      playlistId
    });
    const sortedPlaylistItems = useMemo(() => sortPlaylistItems(playlistItems, playlist.orderBy), [playlistItems]);

    return (
      <Box>
        <Box display="flex" flexDirection="column" pb={1}>
          <Card>
            <CardContent>
              <Box display="flex" flexDirection="column" pb={1}>
                <Typography color="textSecondary">題名</Typography>
                <Box display="flex" alignItems="center">
                  <Typography>{playlist.title || "タイトルです"}</Typography>
                  <Box flex={1} />
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
              <Box display="flex" flexDirection="column">
                <Typography color="textSecondary">説明</Typography>
                <Box display="flex" alignItems="center">
                  <Typography>{playlist.description || "セツメイです"}</Typography>
                  <Box flex={1} />
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Card>
          <Table>
            <TableBody>
              {sortedPlaylistItems.map(playlistItem => (
                <PlaylistItemEditor key={playlistItem.id} playlistItem={playlistItem} playlistId={playlistId} />
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
    );
  })
);

const PlaylistItemEditor = React.memo<{
  playlistItem: PlaylistItem;
  playlistId: string;
}>(({ playlistItem, playlistId }) => {
  const { id: playlistItemId, exerciseSummaryId, memo } = playlistItem;

  const [isDeletePlaylistItemDialogOpen, onToggleDeletePlaylistItemDialog] = useToggleState();

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" flexDirection="column">
          {exerciseSummaryId && <ExerciseTitleViewer entityId={exerciseSummaryId} />}
          <Typography>{memo}</Typography>
        </Box>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={onToggleDeletePlaylistItemDialog}>
          <Delete />
        </IconButton>
      </TableCell>
      <DeletePlaylistItemDialog
        playlistItemId={playlistItemId}
        playlistId={playlistId}
        isOpen={isDeletePlaylistItemDialogOpen}
        onClose={onToggleDeletePlaylistItemDialog}
      />
    </TableRow>
  );
});

const ExerciseTitleViewer = withEntity<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    return (
      <Box>
        <Typography>{exerciseSummary.title}</Typography>
      </Box>
    );
  })
);
