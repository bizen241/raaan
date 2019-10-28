import { Typography } from "@material-ui/core";
import { Public, Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const PublishPlaylistDialog = createDialog<{
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
            isPrivate: false
          },
          onClose
        )
      );

    return (
      <DialogContent title="プレイリストを公開" onClose={onClose}>
        <Card icon={<Warning />} title="プレイリストを公開">
          <Typography>プレイリストが公開されます。</Typography>
        </Card>
        <Button icon={<Public />} label="プレイリストを公開" onClick={onUnpublish} />
      </DialogContent>
    );
  })
);
