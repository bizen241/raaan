import { Typography } from "@material-ui/core";
import { CloudUpload, Person } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadUserDialog = createDialog<{
  userId: string;
}>(
  React.memo(({ userId: bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("User", bufferId, undefined, uploadResponse => {
          const userId = Object.keys(uploadResponse.User)[0];

          dispatch(replace(`/users/${userId}`));
        })
      );
    };

    return (
      <DialogContent title="プロフィールをアップロード" onClose={onClose}>
        <Card icon={<Person />} title="プロフィールをアップロード">
          <Typography>プロフィールをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
