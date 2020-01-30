import { Typography } from "@material-ui/core";
import { Public } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const PublishPlaylistDialog = createDialog<{
  playlistId: string;
}>()(
  React.memo(({ t }) => t("プレイリストを公開")),
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
      <>
        <Card>
          <Typography>プレイリストが公開されます。</Typography>
        </Card>
        <Button icon={<Public />} label="プレイリストを公開" onClick={onUnpublish} />
      </>
    );
  })
);
