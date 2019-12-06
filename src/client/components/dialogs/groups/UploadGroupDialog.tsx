import { Typography } from "@material-ui/core";
import { CloudUpload, Group as GroupIcon } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadGroupDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ groupId: bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Group", bufferId, undefined, uploadResponse => {
          const groupId = Object.keys(uploadResponse.Group)[0];

          dispatch(replace(`/groups/${groupId}`));
        })
      );
    };

    return (
      <DialogContent title="グループをアップロード" onClose={onClose}>
        <Card icon={<GroupIcon />} title="グループをアップロード">
          <Typography>グループをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
