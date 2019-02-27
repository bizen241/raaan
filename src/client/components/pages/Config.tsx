import { Button, Callout, Classes, Divider } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import { useCallback } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { configActions } from "../../reducers/config";
import { LangSettingEditor } from "../config/LangSettingEditor";
import { ThemeSettingEditor } from "../config/ThemeSettingEditor";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate,
    config: state.config.current,
    isLoggedIn: state.app.user.permission !== "Guest"
  }),
  () => ({
    updateSettings: configActions.updateSettings
  }),
  ({ hasUpdate, config, isLoggedIn, updateSettings }) => {
    return (
      <Page>
        <Header heading="設定" />
        <Column padding>
          <Column padding>
            {hasUpdate ? (
              <Button text="アップデート" onClick={() => location.reload()} />
            ) : (
              <Callout intent="success" title="最新のバージョンです" />
            )}
          </Column>
          {!isLoggedIn ? (
            <Column padding>
              <Link className={`${Classes.BUTTON} ${Classes.INTENT_PRIMARY} ${Classes.iconClass("key")}`} to="/login">
                <Trans>ログイン</Trans>
              </Link>
              <Divider />
            </Column>
          ) : null}
          <Column padding>
            <ThemeSettingEditor
              value={config.settings.theme}
              onChange={useCallback(value => updateSettings("theme", value), [])}
            />
          </Column>
          <Column padding>
            <LangSettingEditor
              value={config.settings.lang}
              onChange={useCallback(value => updateSettings("lang", value), [])}
            />
          </Column>
          {isLoggedIn ? (
            <Column padding>
              <Divider />
              <a
                href="/logout"
                className={`${Classes.BUTTON} ${Classes.SMALL} ${Classes.INTENT_WARNING} ${Classes.iconClass("key")}`}
              >
                <Trans>ログアウト</Trans>
              </a>
            </Column>
          ) : null}
        </Column>
      </Page>
    );
  }
);
