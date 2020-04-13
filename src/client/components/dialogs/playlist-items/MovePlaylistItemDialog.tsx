import { Divider, TableCell, TableRow, Typography } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId, Playlist, PlaylistItem } from "../../../../shared/api/entities";
import { sortPlaylistItems } from "../../../domain/playlist";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { Card, Column, Row, Table } from "../../ui";

export const MovePlaylistItemDialog = createDialog<{
  playlistItemId: EntityId<"PlaylistItem">;
  playlist: Playlist;
  playlistItems: PlaylistItem[];
}>()(
  React.memo(({ t }) => t("プレイリストのアイテムの移動")),
  React.memo(({ playlistItemId, playlist, playlistItems, onClose }) => {
    const dispatch = useDispatch();

    const onSelect = (nextId: EntityId<"PlaylistItem">) => {
      dispatch(
        actions.api.upload(
          "PlaylistItem",
          playlistItemId,
          {
            nextId,
          },
          onClose
        )
      );
    };

    const sortedPlaylistItems = sortPlaylistItems(playlistItems, playlist.orderBy);

    return (
      <>
        <Card padding={false}>
          <Divider />
          <Column pb={1}>
            <Table>
              {sortedPlaylistItems.map(
                (playlistItem) =>
                  playlistItem && (
                    <PlaylistItemWithButton key={playlistItem.id} playlistItem={playlistItem} onSelect={onSelect} />
                  )
              )}
            </Table>
          </Column>
        </Card>
      </>
    );
  })
);

const PlaylistItemWithButton = React.memo<{
  playlistItem: PlaylistItem;
  onSelect: (nextId: EntityId<"PlaylistItem">) => void;
}>(({ playlistItem, onSelect }) => {
  return (
    <>
      <TableRow selected style={{ cursor: "pointer" }} onClick={() => onSelect(playlistItem.id)}>
        <TableCell>
          <Row>
            <Row pr={1}>
              <ArrowForward />
            </Row>
            <Typography>ここに移動</Typography>
          </Row>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          {playlistItem.exerciseSummaryId !== undefined ? (
            <ExerciseTitleViewer exerciseSummaryId={playlistItem.exerciseSummaryId} />
          ) : (
            <Typography>削除済み</Typography>
          )}
        </TableCell>
      </TableRow>
    </>
  );
});

const ExerciseTitleViewer = React.memo<{
  exerciseSummaryId: EntityId<"ExerciseSummary">;
}>(({ exerciseSummaryId }) => {
  const { entity: exerciseSummary } = useEntity("ExerciseSummary", exerciseSummaryId);

  return <Typography>{exerciseSummary.title}</Typography>;
});
