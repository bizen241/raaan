import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeletePlaylistDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("Playlist", playlistId, onClose));
    };

    return (
      <DialogContent title="プレイリストの削除" onClose={onClose}>
        <Card icon={<Warning />} title="プレイリストの削除">
          <Typography>プレイリストがサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="プレイリストを削除" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
