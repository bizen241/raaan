import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { Column } from "../ui/Column";

export const PageHeader: React.FunctionComponent = ({ children }) => {
  return (
    <AppBar position="relative" color="default">
      <Column alignItems="center">
        <Column width="100%" maxWidth="1000px" px={1}>
          <Toolbar variant="dense" disableGutters>
            {children}
          </Toolbar>
        </Column>
      </Column>
    </AppBar>
  );
};
