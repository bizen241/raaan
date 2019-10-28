import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Message } from "../../project/Message";
import { Button, Card, DialogContent } from "../../ui";

export const LogoutDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    return (
      <DialogContent title={<Message id="logout" />} onClose={onClose}>
        <Card icon={<Warning />} title={<Message id="logout" />}>
          <Typography>すべての下書きがブラウザから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label={<Message id="logout" />} labelColor="error" href="/logout" />
      </DialogContent>
    );
  })
);
