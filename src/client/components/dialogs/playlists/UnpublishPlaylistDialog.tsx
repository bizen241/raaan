import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, DialogContent, DialogHeader, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const UnpublishPlaylistDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onUnpublish = () => {
      dispatch(
        actions.api.upload("Playlist", playlistId, {
          isPrivate: true
        })
      );

      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストの公開を終了</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>プレイリストが非公開に設定されます。</Typography>
          </Row>
          <Button label="プレイリストの公開を終了" labelColor="error" onClick={onUnpublish} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogContent>
      </>
    );
  })
);
