import { Dialog, IconButton, makeStyles } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React from "react";
import { DialogProps, DialogTransition } from "../../../enhancers/createDialog";
import { useToggleState } from "../../../hooks/useToggleState";
import { DialogHeader } from "../../ui";

export const createPlayerDialog = <P extends {}>(Content: React.ComponentType<DialogProps & P>) =>
  React.memo<DialogProps & P>(props => {
    const classes = useStyles();

    const [isConfigPanelOpen, onToggleConfigPanel] = useToggleState();

    return (
      <Dialog
        classes={{
          paper: classes.dialog
        }}
        fullScreen
        open={props.isOpen}
        onClose={props.onClose}
        TransitionComponent={DialogTransition}
      >
        <DialogHeader
          color="default"
          maxWidth="2000px"
          action={
            <IconButton edge="end" color="inherit" onClick={onToggleConfigPanel}>
              <Settings />
            </IconButton>
          }
          onClose={props.onClose}
        >
          {null}
        </DialogHeader>
        {isConfigPanelOpen ? <div>Config</div> : <Content {...props} />}
      </Dialog>
    );
  });

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: theme.palette.background.default
  }
}));
