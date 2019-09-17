import { Box, Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from "../../enhancers/createDialog";
import { Message } from "../project/Message";
import { DialogContent, DialogHeader } from "../ui/Dialog";
import { useStyles } from "../ui/styles";

export const LogoutDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>
            <Message id="logout" />
          </Typography>
        </DialogHeader>
        <DialogContent>
          <Box display="flex" alignItems="center" flex={1} pb={1}>
            <Warning className={classes.leftIcon} />
            <Typography>すべての下書きがブラウザから削除されます。</Typography>
          </Box>
          <Box display="flex" flexDirection="column" pb={1}>
            <Button className={classes.largeButton} variant="contained" component="a" href="/logout">
              <Typography color="error">
                <Message id="logout" />
              </Typography>
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
