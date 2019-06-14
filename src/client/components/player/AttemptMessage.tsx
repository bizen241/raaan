import { AppBar, Card, CardHeader, DialogContent, IconButton, Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import * as React from "react";

export const AttemptMessage = React.memo<{
  icon: React.ReactNode;
  title: React.ReactNode;
  onClose: () => void;
}>(({ icon, title, onClose }) => (
  <>
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
    <DialogContent>
      <Card>
        <CardHeader avatar={icon} title={title} />
      </Card>
    </DialogContent>
  </>
));
