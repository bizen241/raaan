import { Box } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import React from "react";

export const Column: React.FunctionComponent<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" flexDirection="column" {...props}>
    {children}
  </Box>
);
