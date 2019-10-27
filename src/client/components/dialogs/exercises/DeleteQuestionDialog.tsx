import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, Card, DialogContent2 } from "../../ui";

export const DeleteQuestionDialog = createDialog<{
  onDelete: () => void;
}>(
  React.memo(({ onDelete, onClose }) => {
    return (
      <DialogContent2 title="問題の削除" onClose={onClose}>
        <Card icon={<Warning />} title="問題の削除">
          <Typography>問題が問題集から削除されます。</Typography>
        </Card>
        <Button
          icon={<Delete color="error" />}
          label="問題を削除"
          labelColor="error"
          onClick={() => {
            onDelete();
            onClose();
          }}
        />
      </DialogContent2>
    );
  })
);
