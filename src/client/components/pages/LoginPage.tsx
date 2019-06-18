import { Button } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

export const LoginPage = React.memo(() => {
  const classes = useStyles();

  return (
    <Page>
      <Button className={classes.largeButton} variant="contained" component="a" href="/auth/github">
        GitHubアカウントでログイン
      </Button>
    </Page>
  );
});
