import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Column } from "../ui";

export const LoadingApp = () => (
  <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
    <Column width="100%" maxWidth="1000px" p={1}>
      <Column justifyContent="center" alignItems="center">
        <CircularProgress />
      </Column>
    </Column>
  </Column>
);
