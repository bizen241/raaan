import { Classes } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import * as React from "react";
import { useCallback } from "react";
import { LangName, ThemeName, UserSettings } from "../../../shared/api/entities";
import { userActions } from "../../actions/user";
import { connector } from "../../reducers";
import { Column } from "../ui";

const langNameToLabel: { [T in LangName]: string } = {
  en: "en",
  ja: "ja"
};

const themeNameToLabel: { [T in ThemeName]: string } = {
  dark: "ダーク",
  light: "ライト"
};

export const UserEditor = connector(
  (_, { bufferId }: { bufferId: string }) => ({
    bufferId
  }),
  () => ({
    ...userActions
  }),
  ({ bufferId, updateSettings }) => {
    return (
      <Column>
        <Column padding>
          <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
            <Trans>言語</Trans>
            <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
              <select
                defaultValue={"ja"}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLSelectElement>) =>
                    updateSettings(bufferId, "lang", e.target.value as UserSettings["lang"]),
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
                  (e: React.ChangeEvent<HTMLSelectElement>) =>
                    updateSettings(bufferId, "theme", e.target.value as UserSettings["theme"]),
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
