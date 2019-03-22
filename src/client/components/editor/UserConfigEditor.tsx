import { Classes } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { useCallback } from "react";
import { Lang, Theme } from "../../../shared/api/entities";
import { userConfigActions } from "../../actions/userConfig";
import { connector } from "../../reducers";
import { Column } from "../ui";

const langNameToLabel: { [T in Lang]: string } = {
  default: "デフォルト",
  system: "システム",
  en: "en",
  ja: "ja"
};

const themeNameToLabel: { [T in Theme]: string } = {
  default: "デフォルト",
  system: "システム",
  dark: "ダーク",
  light: "ライト"
};

export const UserConfigEditor = connector(
  (_, { bufferId }: { bufferId: string }) => ({
    bufferId
  }),
  () => ({
    ...userConfigActions
  }),
  ({ bufferId, updateLang, updateTheme }) => {
    return (
      <Column>
        <Column padding>
          <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
            <Trans>言語</Trans>
            <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
              <select
                defaultValue={"ja"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLSelectElement>) => updateLang(bufferId, e.target.value as Lang),
                  []
                )}
              >
                {Object.entries(langNameToLabel).map(([name, label]) => (
                  <option key={name} value={name}>
                    {label}
                  </option>
                ))}
              </select>
            </Column>
          </label>
        </Column>
        <Column padding>
          <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
            <Trans>テーマ</Trans>
            <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
              <select
                defaultValue={"dark"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLSelectElement>) => updateTheme(bufferId, e.target.value as Theme),
                  []
                )}
              >
                {Object.entries(themeNameToLabel).map(([name, label]) => (
                  <option key={name} value={name}>
                    {label}
                  </option>
                ))}
              </select>
            </Column>
          </label>
        </Column>
      </Column>
    );
  }
);
