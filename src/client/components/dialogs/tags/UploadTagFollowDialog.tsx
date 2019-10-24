import { Typography } from "@material-ui/core";
import { AddAlert } from "@material-ui/icons";
import { useEffect, useMemo } from "react";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { TagFollow } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const UploadTagFollowDialog = createDialog<{
  targetId: string;
}>(
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentTag = useContext(UserContext);

    const bufferId = useMemo(() => generateBufferId(), []);
    const onUpload = () => {
      dispatch(
        actions.api.upload<TagFollow>("TagFollow", bufferId, {
          followerId: currentTag.id,
          targetId
        })
      );
    };
    const { uploadStatus, uploadResponse } = useEntity<TagFollow>("TagFollow", bufferId);
    useEffect(() => {
      if (uploadStatus === 200 && uploadResponse !== undefined) {
        dispatch(
          actions.cache.search<TagFollow>(
            "TagFollow",
            {
              followerId: currentTag.id,
              targetId
            },
            {
              ids: [Object.keys(uploadResponse.TagFollow)[0]],
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
          <Typography>フォロー</Typography>
        </DialogHeader>
        <DialogMessage icon={<AddAlert />}>
          <Typography>タグをフォローします。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<AddAlert />} label="フォロー" onClick={onUpload} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
