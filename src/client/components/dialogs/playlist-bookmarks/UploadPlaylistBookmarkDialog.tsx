import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card, Select, SelectOptions } from "../../ui";

type UploadType = "public" | "private";

export const UploadPlaylistBookmarkDialog = createDialog<{
  playlistId: string;
}>()(
  React.memo(({ t }) => t("ブックマークに追加")),
  React.memo(({ playlistId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();
    const isReadOnly = currentUser.permission === "Read";

    const [uploadType, setUploadType] = useState<UploadType>(isReadOnly ? "private" : "public");

    const onUpload = () => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload(
          "PlaylistBookmark",
          bufferId,
          {
            playlistId,
            isPrivate: uploadType === "private"
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "PlaylistBookmark",
                {
                  userId: currentUser.id,
                  playlistId
                },
                uploadResponse
              )
            );

            onClose();
          }
        )
      );
    };

    const selectUploadTypeOptions: SelectOptions<UploadType> = {
      public: {
        label: "公開",
        disabled: isReadOnly
      },
      private: {
        label: "非公開"
      }
    };

    return (
      <>
        <Card>
          <Select<UploadType>
            label="設定"
            options={selectUploadTypeOptions}
            defaultValue={uploadType}
            onChange={value => setUploadType(value)}
          />
        </Card>
        <Button icon={<Add />} label="ブックマークに追加する" onClick={() => onUpload()} />
      </>
    );
  })
);
