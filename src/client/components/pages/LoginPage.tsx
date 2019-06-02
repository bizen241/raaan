import { Button } from "@material-ui/core";
import * as React from "react";
import { connector } from "../../reducers";
import { Page } from "./Page";

export const LoginPage = connector(
  () => ({}),
  () => ({}),
  () => {
    return (
      <Page>
        <Button variant="contained" size="large" component="a" href="/auth/github">
          GitHubアカウントでログイン
        </Button>
      </Page>
    );
  }
);
