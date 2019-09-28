import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../enhancers/createDialog";
import { actions } from "../../reducers";
import { Button, Column, DialogContent, DialogHeader, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const PublishPlaylistDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onUnpublish = () => {
      dispatch(
        actions.api.upload("Playlist", playlistId, {
          isPrivate: false
        })
      );

      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>プレイリストを公開</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>プレイリストが公開されます。</Typography>
          </Row>
          <Column pb={1}>
            <Button label="プレイリストを公開" labelColor="error" onClick={onUnpublish} />
          </Column>
          <Column pb={1}>
            <Button label="キャンセル" onClick={onClose} />
          </Column>
        </DialogContent>
      </>
    );
  })
);
