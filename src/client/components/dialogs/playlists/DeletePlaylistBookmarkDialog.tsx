import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PlaylistBookmark } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const DeletePlaylistBookmarkDialog = createDialog<{
  playlistBookmarkId: string;
  playlistId: string;
}>(
  React.memo(({ playlistBookmarkId, playlistId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onDelete = () => {
      dispatch(actions.api.delete("PlaylistBookmark", playlistBookmarkId));
    };
    const { deleteStatus } = useEntity<PlaylistBookmark>("PlaylistBookmark", playlistBookmarkId);
    useEffect(() => {
      if (deleteStatus === 200) {
        dispatch(
          actions.cache.search<PlaylistBookmark>(
            "PlaylistBookmark",
            {
              userId: currentUser.id,
              playlistId
            },
            {
              ids: [],
              entities: {},
              count: 0
            }
          )
        );
        dispatch(actions.cache.purge("PlaylistBookmark", playlistBookmarkId));

        onClose();
      }
    }, [deleteStatus]);

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
