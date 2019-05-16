import { Button, Callout, Classes, Divider } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { EntityEditor } from "../editor";
import { UserContext } from "../project/Context";
import { Column } from "../ui";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate
  }),
  () => ({}),
  ({ hasUpdate }) => {
    const currentUser = useContext(UserContext);
    const isGuest = currentUser.permission === "Guest";

    return (
      <Page>
        <Column padding="vertical">
          <h2 className={Classes.HEADING}>設定</h2>
          <Column padding="vertical">
            <EntityEditor entityType="UserConfig" entityId={currentUser.configId} />
          </Column>
        </Column>
        <Divider />
        <Column padding="vertical">
          <h2 className={Classes.HEADING}>バージョン</h2>
          <Column padding="vertical">
            {hasUpdate ? (
              <Button text="アップデート" onClick={() => location.reload()} />
            ) : (
              <Callout intent="success" title="最新のバージョンです" />
            )}
          </Column>
        </Column>
        <Column padding="vertical">
          <h2 className={Classes.HEADING}>アカウント</h2>
          <Column padding="vertical">
            {isGuest ? (
              <Link
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY} ${Classes.iconClass("key")}`}
                to="/login"
              >
                <Trans>ログイン</Trans>
              </Link>
            ) : (
              <a
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_WARNING} ${Classes.iconClass("key")}`}
                href="/logout"
              >
                <Trans>ログアウト</Trans>
              </a>
            )}
          </Column>
        </Column>
      </Page>
    );
  }
);
