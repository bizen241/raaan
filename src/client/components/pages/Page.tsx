import { Box } from "@material-ui/core";
import * as React from "react";
import { Header } from "../project/Header";

export const Page: React.FunctionComponent<{
  title?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" position="absolute" top={0} left={0}>
      <Header title={title} />
      <Box display="flex" flexDirection="column" width="100%" maxWidth="1000px" p={1}>
        {children}
      </Box>
    </Box>
  );
};
