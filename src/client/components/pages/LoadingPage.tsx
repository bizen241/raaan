import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { Column, Page } from "../ui";

export const LoadingPage = React.memo(() => {
  return (
    <Page>
      <Column justifyContent="center" alignItems="center">
        <CircularProgress />
      </Column>
    </Page>
  );
});
