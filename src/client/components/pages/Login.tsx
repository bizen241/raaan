import { AnchorButton } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../reducers";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Login = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Page>
        <Header heading="ログイン" />
        <Column padding="around">
          <AnchorButton large intent="primary" text="GitHubアカウントでログイン" href="/auth/github" />
        </Column>
      </Page>
    );
  }
);
