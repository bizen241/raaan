import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { SettingEditor } from ".";
import { ThemeName, UserSettings } from "../../../shared/api/entities";
import { Column } from "../ui";

const themeNameToLabel: { [T in ThemeName]: string } = {
  dark: "ダーク",
  light: "ライト"
};

export const ThemeSettingEditor: SettingEditor<"theme"> = ({ value, onChange }) => {
  return (
    <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
      テーマ
      <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
        <select defaultValue={value || "dark"} onChange={e => onChange(e.target.value as UserSettings["theme"])}>
          {Object.entries(themeNameToLabel).map(([name, label]) => (
            <option key={name} value={name}>
              {label}
            </option>
          ))}
        </select>
      </Column>
    </label>
  );
};
