import { AppBar, DialogContent as MuiDialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";
import { Column } from "./Column";

export const DialogHeader: React.FunctionComponent<{
  maxWidth?: string;
  onClose: () => void;
}> = ({ maxWidth = "1000px", onClose, children }) => {
  return (
    <AppBar position="relative">
      <Column height="100%" alignItems="center">
        <Column flex={1} width="100%" maxWidth={maxWidth}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
            {children}
          </Toolbar>
        </Column>
      </Column>
    </AppBar>
  );
};

export const DialogContent: React.FunctionComponent = ({ children }) => {
  return (
    <MuiDialogContent>
      <Column height="100%" alignItems="center">
        <Column flex={1} width="100%" maxWidth="1000px">
          {children}
        </Column>
      </Column>
    </MuiDialogContent>
  );
};
