import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const DeletePlaylistBookmarkDialog = createDialog<{
  playlistBookmarkId: string;
}>(
  React.memo(({ playlistBookmarkId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistBookmark", playlistBookmarkId, onClose));
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>ブックマークの削除</Typography>
        </DialogHeader>
        <DialogMessage icon={<Warning />}>
          <Typography>ブックマークがサーバーから削除されます。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button label="ブックマークを削除" labelColor="error" onClick={onDelete} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
