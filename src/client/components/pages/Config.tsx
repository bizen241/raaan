import { Button, Callout } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../reducers";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate
  }),
  () => ({}),
  ({ hasUpdate }) => {
    return (
      <Page>
        <Header heading="設定" />
        <Column padding="small">
          {hasUpdate ? (
            <Button text="アップデート" onClick={() => location.reload()} />
          ) : (
            <Callout intent="success" title="最新のバージョンです" />
          )}
        </Column>
      </Page>
    );
  }
);
