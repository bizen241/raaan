import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { Close, Settings } from "@material-ui/icons";
import * as React from "react";
import { createDialog, DialogProps } from "../../../enhancers/createDialog";
import { useToggleState } from "../../../hooks/useToggleState";
import { Column, Row } from "../../ui";

export const createPlayerDialog = <P extends {}>(Content: React.ComponentType<P & DialogProps>) =>
  createDialog<P>(
    React.memo(props => {
      const [isConfigPanelOpen, onToggleConfigPanel] = useToggleState();

      return (
        <>
          <AppBar position="relative">
            <Column height="100%" alignItems="center">
              <Column flex={1} width="100%" maxWidth="2000px">
                <Toolbar variant="dense">
                  <IconButton edge="start" color="inherit" onClick={props.onClose}>
                    <Close />
                  </IconButton>
                  <Row flex={1} />
                  <IconButton edge="end" color="inherit" onClick={onToggleConfigPanel}>
                    <Settings />
                  </IconButton>
                </Toolbar>
              </Column>
            </Column>
          </AppBar>
          {isConfigPanelOpen ? <div>Config</div> : <Content {...props} />}
        </>
      );
    })
  );
