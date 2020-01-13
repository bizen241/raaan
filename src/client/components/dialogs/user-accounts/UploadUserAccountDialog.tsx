import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadUserAccountDialog = createDialog<{
  userAccountId: string;
}>(
  React.memo(({ userAccountId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(actions.api.upload("UserAccount", userAccountId, undefined, onClose));
    };

    return (
      <DialogContent title="アバターの設定をアップロード" onClose={onClose}>
        <Card icon={<CloudUpload />} title="アバターの設定をアップロード">
          <Typography>アバターの設定をアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
