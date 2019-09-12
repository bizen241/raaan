import {
  AppBar,
  Box,
  Dialog,
  DialogContent as MuiDialogContent,
  IconButton,
  makeStyles,
  Slide,
  Toolbar
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Close } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const createDialog = <P extends {}>(Content: React.ComponentType<P & DialogProps>) =>
  React.memo<P & DialogProps>(props => {
    const { isOpen, onClose } = props;

    const classes = useStyles();

    return (
      <Dialog
        classes={{
          paper: classes.dialog
        }}
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <Content {...props} />
      </Dialog>
    );
  });

const useStyles = makeStyles(theme => ({
  dialog: {
    backgroundColor: theme.palette.background.default
  }
}));

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

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

export const useToggleState = () => {
  const [isDialogOpen, toggleDialog] = useState(false);
  const onToggleDialog = useCallback(() => toggleDialog(s => !s), []);

  return [isDialogOpen, onToggleDialog] as const;
};
