import { Box, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import * as React from "react";
import { createDialog, DialogHeader, DialogProps, useToggleState } from "../../dialogs";

export const createPlayerDialog = <P extends {}>(Content: React.ComponentType<P & DialogProps>) =>
  createDialog<P>(
    React.memo(props => {
      const [isConfigPanelOpen, onToggleConfigPanel] = useToggleState();

      return (
        <>
          <DialogHeader maxWidth="2000px" onClose={props.onClose}>
            <Box flex={1} />
            <IconButton edge="end" color="inherit" onClick={onToggleConfigPanel}>
              <Settings />
            </IconButton>
          </DialogHeader>
          {isConfigPanelOpen ? <div>Config</div> : <Content {...props} />}
        </>
      );
    })
  );
