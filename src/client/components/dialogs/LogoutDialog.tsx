import { AppBar, Box, Button, DialogContent, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Close, Warning } from "@material-ui/icons";
import * as React from "react";
import { createDialog } from ".";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";

export const LogoutDialog = createDialog<{}>(
  React.memo(({ onClose }) => {
    const classes = useStyles();

    return (
      <>
        <AppBar position="relative">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
            <Typography>
              <Message id="logout" />
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box display="flex" flexDirection="column" flex={1} height="100%">
            <Box display="flex" flexDirection="column" flex={1} justifyContent="center">
              <Box display="flex" alignItems="center">
                <Warning className={classes.leftIcon} />
                <Typography>すべての下書きがブラウザから削除されます。</Typography>
              </Box>
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
          </Box>
        </DialogContent>
      </>
    );
  })
);
