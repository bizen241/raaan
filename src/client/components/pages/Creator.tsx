import { Classes } from "@blueprintjs/core";
import { push } from "connected-react-router";
import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
    create: () => push(`/contents/${Date.now()}/edit`)
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
          <Link
            className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`}
            to={`/contents/${Date.now()}/edit`}
          >
            新規作成 (n)
          </Link>
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
