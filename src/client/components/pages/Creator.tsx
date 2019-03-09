import { Button } from "@blueprintjs/core";
import * as React from "react";
import { useEffect } from "react";
import { connector } from "../../reducers";
import { buffersActions } from "../../reducers/buffers";
import { ContentList } from "../content/list/ContentList";
import { EditorBufferList } from "../content/list/EditorBufferList";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const Creator = connector(
  () => ({}),
  () => ({
    create: buffersActions.create
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
          <Button large intent="primary" onClick={create}>
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
