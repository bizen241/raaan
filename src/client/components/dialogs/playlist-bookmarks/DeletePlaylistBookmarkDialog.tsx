import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeletePlaylistBookmarkDialog = createDialog<{
  playlistBookmarkId: string;
}>(
  React.memo(({ playlistBookmarkId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistBookmark", playlistBookmarkId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="ブックマークの削除" onClose={onClose}>
        <Card icon={<Warning />} title="ブックマークの削除">
          <Typography>ブックマークがサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="ブックマークを削除" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
