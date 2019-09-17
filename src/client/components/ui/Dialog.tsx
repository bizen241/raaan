import { AppBar, Box, DialogContent as MuiDialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";

export const DialogHeader: React.FunctionComponent<{
  maxWidth?: string;
  onClose: () => void;
}> = ({ maxWidth = "1000px", onClose, children }) => {
  return (
    <AppBar position="relative">
      <Box display="flex" flexDirection="column" height="100%" alignItems="center">
        <Box display="flex" flexDirection="column" flex={1} width="100%" maxWidth={maxWidth}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
            {children}
          </Toolbar>
        </Box>
      </Box>
    </AppBar>
  );
};

export const DialogContent: React.FunctionComponent = ({ children }) => {
  return (
    <MuiDialogContent>
      <Box display="flex" flexDirection="column" height="100%" alignItems="center">
        <Box display="flex" flexDirection="column" flex={1} width="100%" maxWidth="1000px">
          {children}
        </Box>
      </Box>
    </MuiDialogContent>
  );
};
