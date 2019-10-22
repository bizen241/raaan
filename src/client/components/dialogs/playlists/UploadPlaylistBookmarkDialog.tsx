import { Typography } from "@material-ui/core";
import { Bookmark, Lock, Public } from "@material-ui/icons";
import { useContext, useEffect, useMemo } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { PlaylistBookmark } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const UploadPlaylistBookmarkDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const bufferId = useMemo(() => generateBufferId(), []);
    const onUploadAsPublic = () => {
      dispatch(
        actions.api.upload<PlaylistBookmark>("PlaylistBookmark", bufferId, {
          playlistId,
          isPrivate: false
        })
      );
    };
    const onUploadAsPrivate = () => {
      dispatch(
        actions.api.upload<PlaylistBookmark>("PlaylistBookmark", bufferId, {
          playlistId,
          isPrivate: true
        })
      );
    };
    const { uploadStatus, uploadResponse } = useEntity<PlaylistBookmark>("PlaylistBookmark", bufferId);
    useEffect(() => {
      if (uploadStatus === 200 && uploadResponse !== undefined) {
        dispatch(
          actions.cache.search<PlaylistBookmark>(
            "PlaylistBookmark",
            {
              userId: currentUser.id,
              playlistId
            },
            {
              ids: [Object.keys(uploadResponse.PlaylistBookmark)[0]],
              entities: {},
              count: 1
            }
          )
        );

        onClose();
      }
    }, [uploadStatus]);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>ブックマークに追加</Typography>
        </DialogHeader>
        <DialogMessage icon={<Bookmark />}>
          <Typography>ブックマークに追加します。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<Public />} label="公開" onClick={onUploadAsPublic} />
          <Button icon={<Lock />} label="非公開" onClick={onUploadAsPrivate} />
        </DialogActions>
      </>
    );
  })
);
