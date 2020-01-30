import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, Card } from "../../ui";

export const DeleteQuestionDialog = createDialog<{
  onDelete: () => void;
}>()(
  React.memo(({ t }) => t("問題の削除")),
  React.memo(({ onDelete, onClose }) => {
    return (
      <>
        <Card>
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
      </>
    );
  })
);
