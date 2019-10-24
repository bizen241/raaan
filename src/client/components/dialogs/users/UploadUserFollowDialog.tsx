import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { useEffect, useMemo } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { UserFollow } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const UploadUserFollowDialog = createDialog<{
  targetId: string;
}>(
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();

    const bufferId = useMemo(() => generateBufferId(), []);
    const onUpload = () => {
      dispatch(
        actions.api.upload<UserFollow>("UserFollow", bufferId, {
          targetId
        })
      );
    };
    const { uploadStatus, uploadResponse } = useEntity<UserFollow>("UserFollow", bufferId);
    useEffect(() => {
      if (uploadStatus === 200 && uploadResponse !== undefined) {
        dispatch(
          actions.cache.search<UserFollow>(
            "UserFollow",
            {
              targetId
            },
            {
              ids: [Object.keys(uploadResponse.UserFollow)[0]],
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
        <DialogMessage icon={<PersonAdd />}>
          <Typography>ユーザーをフォローします。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<PersonAdd />} label="フォロー" onClick={onUpload} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
