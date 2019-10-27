import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, DialogContent2 } from "../../ui";

export const UploadGroupDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ onClose }) => {
    return (
      <DialogContent2 title="グループをアップロード" onClose={onClose}>
        <Button icon={<CloudUpload />} label="アップロード" />
      </DialogContent2>
    );
  })
);
