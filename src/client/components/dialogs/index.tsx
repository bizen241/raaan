import { Dialog, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
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
