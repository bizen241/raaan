import { Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { Button, DialogContent, DialogHeader, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const DeleteAccountDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>アカウントを削除</Typography>
        </DialogHeader>
        <DialogContent>
          <Row alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>すべての情報がサーバーから削除されます。</Typography>
          </Row>
          <Button label="アカウントを削除" labelColor="error" href="/logout" />
          <Button label="キャンセル" onClick={onClose} />
        </DialogContent>
      </>
    );
  })
);
