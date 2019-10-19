import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PlaylistItem } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { Button, Column, DialogContent, DialogHeader, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const DeletePlaylistItemDialog = createDialog<{
  playlistItemId: string;
  playlistId: string;
}>(
  React.memo(({ playlistItemId, playlistId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistItem", playlistItemId));
    };

    const { deleteStatus } = useEntity<PlaylistItem>("PlaylistItem", playlistItemId);
    const { entities, count } = useSearch<PlaylistItem>("PlaylistItem", {
      playlistId
    });
    useEffect(() => {
      if (deleteStatus !== 200) {
        return;
      }

      dispatch(
        actions.cache.search(
          "PlaylistItem",
          {
            playlistId
          },
          {
            ids: [...entities.map(playlistItem => playlistItem.id).filter(id => id !== playlistItemId)],
            entities: {},
            count: count - 1
          }
        )
      );
      dispatch(actions.cache.purge("PlaylistItem", playlistItemId));

      onClose();
    }, [deleteStatus]);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストのアイテムの削除</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>プレイリストのアイテムがサーバーから削除されます。</Typography>
          </Row>
          <Column pb={1}>
            <Button label="プレイリストのアイテムを削除" labelColor="error" onClick={onDelete} />
          </Column>
          <Column pb={1}>
            <Button label="キャンセル" onClick={onClose} />
          </Column>
        </DialogContent>
      </>
    );
  })
);
