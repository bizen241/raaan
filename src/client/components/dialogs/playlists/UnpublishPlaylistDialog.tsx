import { Typography } from "@material-ui/core";
import { Lock, Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UnpublishPlaylistDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const dispatch = useDispatch();

    const onUnpublish = () =>
      dispatch(
        actions.api.upload(
          "Playlist",
          playlistId,
          {
            isPrivate: true
          },
          onClose
        )
      );

    return (
      <DialogContent title="プレイリストの公開を終了" onClose={onClose}>
        <Card icon={<Warning />} title="プレイリストの公開を終了">
          <Typography>プレイリストが非公開に設定されます。</Typography>
        </Card>
        <Button icon={<Lock />} label="プレイリストの公開を終了" onClick={onUnpublish} />
      </DialogContent>
    );
  })
);
