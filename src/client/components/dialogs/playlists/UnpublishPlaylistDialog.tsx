import { Typography } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UnpublishPlaylistDialog = createDialog<{
  playlistId: string;
}>()(
  React.memo(({ t }) => t("プレイリストの公開を終了")),
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
      <>
        <Card>
          <Typography>プレイリストが非公開に設定されます。</Typography>
        </Card>
        <Button icon={<Lock />} label="プレイリストの公開を終了" onClick={onUnpublish} />
      </>
    );
  })
);
