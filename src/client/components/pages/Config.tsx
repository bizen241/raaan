import { Button, Callout, Classes, Divider } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import { useCallback } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { userActions } from "../../actions/user";
import { connector } from "../../reducers";
import { LangSettingEditor } from "../config/LangSettingEditor";
import { ThemeSettingEditor } from "../config/ThemeSettingEditor";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { Page } from "./Page";

export const Config = connector(
  state => ({
    hasUpdate: state.app.hasUpdate,
    settings: state.config.settings,
    isLoggedIn: state.app.user != null
  }),
  () => ({
    updateSettings: userActions.updateSettings
  }),
  ({ hasUpdate, settings, isLoggedIn, updateSettings }) => {
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
            <a href="/logout" className={`${Classes.BUTTON} ${Classes.LARGE}`}>
              <Trans>詳細設定</Trans>
            </a>
          </Column>
          <Column padding>
            <ThemeSettingEditor
              value={settings.theme}
              onChange={useCallback(value => updateSettings("", "theme", value), [])}
            />
          </Column>
          <Column padding>
            <LangSettingEditor
              value={settings.lang}
              onChange={useCallback(value => updateSettings("", "lang", value), [])}
            />
          </Column>
          {isLoggedIn ? (
            <Column padding>
              <Divider />
              <a href="/logout" className={`${Classes.BUTTON} ${Classes.iconClass("key")}`}>
                <Trans>アカウント</Trans>
              </a>
            </Column>
          ) : null}
        </Column>
      </Page>
    );
  }
);
