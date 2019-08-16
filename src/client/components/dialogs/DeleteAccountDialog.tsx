import { Box, Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog, DialogContent, DialogHeader } from ".";
import { useStyles } from "../ui/styles";

export const DeleteAccountDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>アカウントを削除</Typography>
        </DialogHeader>
        <DialogContent>
          <Box display="flex" alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>すべての情報がサーバーから削除されます。</Typography>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" component="a" href="/logout">
              <Typography color="error">アカウントを削除</Typography>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Box>
        </DialogContent>
      </>
    );
  })
);
