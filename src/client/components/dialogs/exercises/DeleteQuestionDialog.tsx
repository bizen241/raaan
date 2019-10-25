import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, DialogContent, DialogHeader, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const DeleteQuestionDialog = createDialog<{
  onDelete: () => void;
}>(
  React.memo(({ onDelete, onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題の削除</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>問題が問題集から削除されます。</Typography>
          </Row>
          <Button
            label="問題を削除"
            labelColor="error"
            onClick={() => {
              onDelete();
              onClose();
            }}
          />
          <Button label="キャンセル" onClick={onClose} />
        </DialogContent>
      </>
    );
  })
);
