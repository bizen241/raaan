import { AppBar, Card, CardHeader, DialogContent, Toolbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { IconButton } from "../../ui";

export const AttemptMessage = React.memo<{
  icon: React.ReactNode;
  title: React.ReactNode;
  onClose: () => void;
}>(({ icon, title, onClose }) => (
  <>
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton icon={Close} edge="start" onClick={onClose} />
      </Toolbar>
    </AppBar>
    <DialogContent>
      <Card>
        <CardHeader avatar={icon} title={title} />
      </Card>
    </DialogContent>
  </>
));
