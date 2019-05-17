import { Callout } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../reducers";
import { Column } from "../ui";
import { Page } from "./Page";

export const NotFoundPage = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <Page>
        <Column padding="vertical">
          <Callout intent="warning" title="ページが見つかりませんでした" />
        </Column>
      </Page>
    );
  }
);
