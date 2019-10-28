import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadUserConfigDialog = createDialog<{
  userConfigId: string;
}>(
  React.memo(({ userConfigId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(actions.api.upload("UserConfig", userConfigId, undefined, onClose));
    };

    return (
      <DialogContent title="設定をアップロード" onClose={onClose}>
        <Card icon={<CloudUpload />} title="設定をアップロード">
          <Typography>設定をアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
