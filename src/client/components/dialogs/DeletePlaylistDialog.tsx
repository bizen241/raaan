import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../enhancers/createDialog";
import { actions } from "../../reducers";
import { Button, Column, DialogContent, DialogHeader, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const DeletePlaylistDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("Playlist", playlistId));
      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストの削除</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>プレイリストがサーバーから削除されます。</Typography>
          </Row>
          <Column pb={1}>
            <Button label="プレイリストを削除" labelColor="error" onClick={onDelete} />
          </Column>
          <Column pb={1}>
            <Button label="キャンセル" onClick={onClose} />
          </Column>
        </DialogContent>
      </>
    );
  })
);
