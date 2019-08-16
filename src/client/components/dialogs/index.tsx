import { AppBar, Box, Dialog, DialogContent as MuiDialogContent, IconButton, Slide, Toolbar } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Close } from "@material-ui/icons";
import * as React from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const createDialog = <P extends {}>(Content: React.ComponentType<P & DialogProps>) =>
  React.memo<P & DialogProps>(props => {
    const { isOpen, onClose } = props;

    return (
      <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
        <Content {...props} />
      </Dialog>
    );
  });

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

export const DialogContent: React.FunctionComponent<{
  maxWidth?: string;
}> = ({ maxWidth = "1000px", children }) => {
  return (
    <MuiDialogContent>
      <Box display="flex" flexDirection="column" height="100%" alignItems="center">
        <Box display="flex" flexDirection="column" flex={1} width="100%" maxWidth={maxWidth}>
          {children}
        </Box>
      </Box>
    </MuiDialogContent>
  );
};
