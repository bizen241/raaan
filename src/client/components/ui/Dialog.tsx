import { AppBar, Avatar, Card, CardContent, CardHeader, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";
import { Column } from "./Column";
import { Row } from "./Row";
import { useStyles } from "./styles";

export const DialogHeader: React.FunctionComponent<{
  maxWidth?: string;
  onClose: () => void;
}> = ({ maxWidth = "1000px", onClose, children }) => {
  return (
    <AppBar position="relative">
      <Column height="100%" alignItems="center">
        <Column flex={1} width="100%" maxWidth={maxWidth}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
            {children}
          </Toolbar>
        </Column>
      </Column>
    </AppBar>
  );
};

export const DialogContent: React.FunctionComponent = ({ children }) => {
  return (
    <Column alignItems="center">
      <Column width="100%" maxWidth="1000px" p={1}>
        {children}
      </Column>
    </Column>
  );
};

export const DialogMessage: React.FunctionComponent<{
  icon: React.ReactNode;
}> = ({ icon, children }) => {
  const classes = useStyles();

  return (
    <DialogContent>
      <Column>
        <Card>
          <CardHeader
            avatar={<Avatar className={classes.cardAvatar}>{icon}</Avatar>}
            title={<Typography>投票する</Typography>}
          />
          <CardContent>
            <Row alignItems="center">
              <Column>{children}</Column>
            </Row>
          </CardContent>
        </Card>
      </Column>
    </DialogContent>
  );
};

export const DialogActions: React.FunctionComponent = ({ children }) => {
  return (
    <Column alignItems="center">
      <Column width="100%" maxWidth="1000px" px={1}>
        {children}
      </Column>
    </Column>
  );
};
