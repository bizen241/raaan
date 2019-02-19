import { Classes } from "@blueprintjs/core";
import { push } from "connected-react-router";
import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { EditorBufferList } from "../content/list/EditorBufferList";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const Creator = connector(
  () => ({}),
  () => ({
    create: () => push("/contents/new")
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
        <Column>
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE}`} to="/creator/private">
              プライベート
            </Link>
          </Column>
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.DISABLED}`} to="/creator/public">
              パブリック
            </Link>
          </Column>
          <Column padding="small">
            <Link className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`} to="/contents/new">
              新規作成 (n)
            </Link>
          </Column>
        </Column>
        <Column padding="small">
          <EditorBufferList />
        </Column>
      </Page>
    );
  }
);
