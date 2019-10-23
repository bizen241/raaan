import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Column, DialogContent, DialogHeader, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const DeletePlaylistItemDialog = createDialog<{
  playlistItemId: string;
}>(
  React.memo(({ playlistItemId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistItem", playlistItemId, onClose));
    };

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
