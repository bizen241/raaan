import { Box, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import * as React from "react";
import { createDialog, DialogProps } from "../../../enhancers/createDialog";
import { useToggleState } from "../../../hooks/useToggleState";
import { OldDialogHeader } from "../../ui/Dialog";

export const createPlayerDialog = <P extends {}>(Content: React.ComponentType<P & DialogProps>) =>
  createDialog<P>(
    React.memo(props => {
      const [isConfigPanelOpen, onToggleConfigPanel] = useToggleState();

      return (
        <>
          <OldDialogHeader maxWidth="2000px" onClose={props.onClose}>
            <Box flex={1} />
            <IconButton edge="end" color="inherit" onClick={onToggleConfigPanel}>
              <Settings />
            </IconButton>
          </OldDialogHeader>
          {isConfigPanelOpen ? <div>Config</div> : <Content {...props} />}
        </>
      );
    })
  );
