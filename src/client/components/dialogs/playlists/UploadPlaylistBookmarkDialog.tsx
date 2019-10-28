import { Add, Bookmark } from "@material-ui/icons";
import * as React from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { PlaylistBookmark } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent, Select } from "../../ui";

type UploadType = "public" | "private";

export const UploadPlaylistBookmarkDialog = createDialog<{
  playlistId: string;
}>(
  React.memo(({ playlistId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);
    const isReadOnly = currentUser.permission === "Read";

    const [uploadType, setUploadType] = useState<UploadType>(isReadOnly ? "private" : "public");

    const onUpload = () => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload<PlaylistBookmark>(
          "PlaylistBookmark",
          bufferId,
          {
            playlistId,
            isPrivate: uploadType === "private"
          },
          uploadResponse => {
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
        )
      );
    };

    return (
      <DialogContent title="ブックマークに追加" onClose={onClose}>
        <Card icon={<Bookmark />} title="ブックマークに追加">
          <Select label="設定" defaultValue={uploadType} onChange={e => setUploadType(e.target.value as UploadType)}>
            <option value="public" disabled={isReadOnly}>
              公開
            </option>
            <option value="private">非公開</option>
          </Select>
        </Card>
        <Button icon={<Add />} label="ブックマークに追加する" onClick={() => onUpload()} />
      </DialogContent>
    );
  })
);
