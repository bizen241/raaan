import { Button, Callout } from "@blueprintjs/core";
import * as React from "react";
import { useCallback } from "react";
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
    config: state.config.current
  }),
  () => ({
    updateSettings: configActions.updateSettings
  }),
  ({ hasUpdate, config, updateSettings }) => {
    return (
      <Page>
        <Header heading="設定" />
        <Column padding="small">
          <Column padding="small">
            {hasUpdate ? (
              <Button text="アップデート" onClick={() => location.reload()} />
            ) : (
              <Callout intent="success" title="最新のバージョンです" />
            )}
          </Column>
          <Column padding="small">
            <ThemeSettingEditor
              value={config.settings.theme}
              onChange={useCallback(value => updateSettings("theme", value), [])}
            />
          </Column>
          <Column padding="small">
            <LangSettingEditor
              value={config.settings.lang}
              onChange={useCallback(value => updateSettings("lang", value), [])}
            />
          </Column>
        </Column>
      </Page>
    );
  }
);
