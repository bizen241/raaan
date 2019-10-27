import { Typography } from "@material-ui/core";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { DialogHeader } from "../../ui";

export const UploadGroupDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ onClose }) => {
    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>グループをアップロード</Typography>
        </DialogHeader>
      </>
    );
  })
);
