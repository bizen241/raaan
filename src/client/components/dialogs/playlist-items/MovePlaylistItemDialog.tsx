import { Divider, ListItemIcon, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { ArrowForward, SwapVert } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Playlist, PlaylistItem } from "../../../../shared/api/entities";
import { sortPlaylistItems } from "../../../domain/playlist";
import { createDialog } from "../../../enhancers/createDialog";
import { withEntity } from "../../../enhancers/withEntity";
import { actions } from "../../../reducers";
import { Card, Column, DialogContent, Row } from "../../ui";

export const MovePlaylistItemDialog = createDialog<{
  playlistItemId: string;
  playlistId: string;
  playlist: Playlist;
  playlistItems: PlaylistItem[];
}>(
  React.memo(({ playlistItemId, playlist, playlistItems, onClose }) => {
    const dispatch = useDispatch();

    const onSelect = (nextId: string) => {
      dispatch(
        actions.api.upload(
          "PlaylistItem",
          playlistItemId,
          {
            nextId
          },
          onClose
        )
      );
    };

    const sortedPlaylistItems = sortPlaylistItems(playlistItems, playlist.orderBy);

    return (
      <DialogContent title="プレイリストのアイテムの移動" onClose={onClose}>
        <Card icon={<SwapVert />} title="移動先の選択" padding={false}>
          <Divider />
          <Column pb={1}>
            <Table>
              <TableBody>
                {sortedPlaylistItems.map(playlistItem => (
                  <PlaylistItemWithButton key={playlistItem.id} playlistItem={playlistItem} onSelect={onSelect} />
                ))}
              </TableBody>
            </Table>
          </Column>
        </Card>
      </DialogContent>
    );
  })
);

const PlaylistItemWithButton = React.memo<{
  playlistItem: PlaylistItem;
  onSelect: (nextId: string) => void;
}>(({ playlistItem, onSelect }) => {
  return (
    <>
      <TableRow selected style={{ cursor: "pointer" }} onClick={() => onSelect(playlistItem.id)}>
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

const ExerciseTitleViewer = withEntity("ExerciseSummary")(
  React.memo(({ entity: exerciseSummary }) => {
    return <Typography>{exerciseSummary.title}</Typography>;
  })
);
