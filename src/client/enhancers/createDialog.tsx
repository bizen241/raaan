import { Dialog, makeStyles, Slide, SlideProps } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { FetchErrorBoundary } from "../components/boundaries/FetchErrorBoundary";
import { Button, DialogContent, DialogHeader } from "../components/ui";

interface DialogOptions {
  isCancelable?: boolean;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const createDialog = <P extends {}>(_: DialogOptions = {}) => (
  TitleComponent: React.ComponentType<DialogProps & P & { t: TFunction }>,
  BodyComponent: React.ComponentType<DialogProps & P & { t: TFunction }>
) =>
  React.memo<DialogProps & P>((props) => {
    const { isOpen, onClose } = props;

    const classes = useStyles();
    const { t } = useTranslation();

    return (
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={DialogTransition}
      >
        <DialogHeader onClose={onClose}>
          <TitleComponent {...props} t={t} />
        </DialogHeader>
        <DialogContent>
          <FetchErrorBoundary>
            <BodyComponent {...props} t={t} />
            <Button icon={<Clear />} label="キャンセル" onClick={onClose} />
          </FetchErrorBoundary>
        </DialogContent>
      </Dialog>
    );
  });

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: theme.palette.background.default,
  },
}));

export const dialogTimeout = 500;

export const DialogTransition = React.forwardRef<unknown, SlideProps>(({ children, ...props }, ref) => (
  <Slide direction="up" ref={ref} timeout={{ enter: dialogTimeout, exit: dialogTimeout }} {...props}>
    {children}
  </Slide>
));
