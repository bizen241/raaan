import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeletePlaylistItemDialog = createDialog<{
  playlistItemId: string;
}>(
  React.memo(({ playlistItemId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistItem", playlistItemId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="プレイリストのアイテムの削除" onClose={onClose}>
        <Card>
          <Typography>プレイリストのアイテムがサーバーから削除されます。</Typography>
        </Card>
        <Button
          icon={<Delete color="error" />}
          label="プレイリストのアイテムを削除"
          labelColor="error"
          onClick={onDelete}
        />
      </DialogContent>
    );
  })
);
