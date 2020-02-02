import { AppBar, AppBarProps, Toolbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { IconButton } from ".";
import { Column } from "./Column";
import { Row } from "./Row";

export const DialogHeader = React.memo<{
  color?: AppBarProps["color"];
  maxWidth?: string;
  action?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}>(({ color, maxWidth = "1000px", action, onClose, children }) => {
  return (
    <AppBar color={color} position="relative">
      <Column height="100%" alignItems="center">
        <Column flex={1} width="100%" maxWidth={maxWidth}>
          <Toolbar variant="dense">
            <IconButton icon={Close} edge="start" onClick={onClose} />
            <Row flex={1}>
              <Typography>{children}</Typography>
            </Row>
            {action}
          </Toolbar>
        </Column>
      </Column>
    </AppBar>
  );
});
