import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteAccountDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    return (
      <DialogContent title="アカウントを削除" onClose={onClose}>
        <Card icon={<Warning />} title="アカウントを削除">
          <Typography>すべての情報がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="アカウントを削除" labelColor="error" href="/logout" />
      </DialogContent>
    );
  })
);
