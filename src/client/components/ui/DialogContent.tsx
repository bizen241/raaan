import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Clear, Close } from "@material-ui/icons";
import * as React from "react";
import { Button } from "./Button";
import { Column } from "./Column";
import { Row } from "./Row";

export const DialogContent: React.FunctionComponent<{
  title: React.ReactNode;
  action?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, action, onClose, children }) => {
  return (
    <>
      <AppBar position="relative">
        <Column height="100%" alignItems="center">
          <Column flex={1} width="100%" maxWidth="1000px">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" onClick={onClose}>
                <Close />
              </IconButton>
              <Row flex={1}>
                <Typography>{title}</Typography>
              </Row>
              {action}
            </Toolbar>
          </Column>
        </Column>
      </AppBar>
      <Column alignItems="center">
        <Column width="100%" maxWidth="1000px" p={1}>
          {children}
          <Button icon={<Clear />} label="キャンセル" onClick={onClose} />
        </Column>
      </Column>
    </>
  );
};
