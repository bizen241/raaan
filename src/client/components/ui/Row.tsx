import { Box } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";
import * as React from "react";

export const Row: React.FunctionComponent<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);
