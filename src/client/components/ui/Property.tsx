import { Divider, Typography } from "@material-ui/core";
import React from "react";
import { Column } from "./Column";

export const Property = React.memo<{
  label: React.ReactNode;
  children: React.ReactNode;
}>(({ label, children }) => (
  <Column mb={1}>
    <Typography color="textSecondary">{label}</Typography>
    <Column pl={1}>
      <Typography component="div">{children}</Typography>
    </Column>
    <Divider />
  </Column>
));
