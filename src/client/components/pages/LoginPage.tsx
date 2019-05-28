import { AnchorButton } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../reducers";
import { Column } from "../ui";
import { Page } from "./Page";

export const LoginPage = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Page>
        <Column padding="vertical">
          <AnchorButton large intent="primary" text="GitHubアカウントでログイン" href="/auth/github" />
        </Column>
      </Page>
    );
  }
);