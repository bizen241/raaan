import { Callout } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../reducers";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const NotFound = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Page>
        <Header heading="404 Not Found" />
        <Column padding>
          <Callout intent="warning" title="ページが見つかりませんでした" />
        </Column>
      </Page>
    );
  }
);
