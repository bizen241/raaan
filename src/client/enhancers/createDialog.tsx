import { Dialog, makeStyles, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import * as React from "react";

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

export const dialogTimeout = 500;

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} timeout={{ enter: dialogTimeout, exit: dialogTimeout }} {...props} />
));
