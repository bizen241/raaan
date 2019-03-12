import { Button } from "@blueprintjs/core";
import { useCallback, useEffect } from "react";
import * as React from "react";
import { contentActions } from "../../actions/content";
import { connector } from "../../reducers";
import { ContentList } from "../content/list/ContentList";
import { EditorBufferList } from "../content/list/EditorBufferList";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const Creator = connector(
  () => ({}),
  () => ({
    create: contentActions.create
  }),
  ({ create }) => {
    useEffect(
      manageHotKey({
        n: create
      }),
      []
    );

    return (
      <Page>
        <Header heading="作成" />
        <Column padding>
          <Button large intent="primary" onClick={useCallback(() => create(), [])}>
            新規作成 (n)
          </Button>
        </Column>
        <Column padding>
          <EditorBufferList />
        </Column>
        <Column padding>
          <ContentList />
        </Column>
      </Page>
    );
  }
);
