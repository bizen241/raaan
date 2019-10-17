import { Card, ListItemIcon, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ExerciseSummary, Playlist, PlaylistItem } from "../../../shared/api/entities";
import { sortPlaylistItems } from "../../domain/playlist";
import { createDialog } from "../../enhancers/createDialog";
import { withEntity } from "../../enhancers/withEntity";
import { actions } from "../../reducers";
import { Button, Column, DialogContent, DialogHeader, Row } from "../ui";

export const MovePlaylistItemDialog = createDialog<{
  playlistItemId: string;
  playlistId: string;
  playlist: Playlist;
  playlistItems: PlaylistItem[];
}>(
  React.memo(({ playlistItemId, playlist, playlistItems, onClose }) => {
    const dispatch = useDispatch();

    const sortedPlaylistItems = React.useMemo(() => sortPlaylistItems(playlistItems, playlist.orderBy), [
      playlistItems
    ]);

    const onSelect = useCallback((nextId: string) => {
      dispatch(
        actions.api.upload("PlaylistItem", playlistItemId, {
          nextId
        })
      );

      onClose();
    }, []);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストのアイテムの移動</Typography>
        </DialogHeader>
        <DialogContent>
          <Column pb={1}>
            <Card>
              <Table>
                <TableBody>
                  {sortedPlaylistItems.map(playlistItem => (
                    <PlaylistItemWithButton key={playlistItem.id} playlistItem={playlistItem} onSelect={onSelect} />
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Column>
          <Column pb={1}>
            <Button label="キャンセル" onClick={onClose} />
          </Column>
        </DialogContent>
      </>
    );
  })
);

const PlaylistItemWithButton = React.memo<{
  playlistItem: PlaylistItem;
  onSelect: (nextId: string) => void;
}>(({ playlistItem, onSelect }) => {
  return (
    <>
      <TableRow selected style={{ cursor: "pointer" }} onClick={useCallback(() => onSelect(playlistItem.id), [])}>
        <TableCell>
          <Row>
            <ListItemIcon>
              <ArrowForward />
            </ListItemIcon>
            <Typography>ここに移動</Typography>
          </Row>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          {playlistItem.exerciseSummaryId !== undefined ? (
            <ExerciseTitleViewer entityId={playlistItem.exerciseSummaryId} />
          ) : (
            <div>削除済み</div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
});

const ExerciseTitleViewer = withEntity<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    return <Typography>{exerciseSummary.title}</Typography>;
  })
);
