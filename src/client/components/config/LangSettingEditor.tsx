import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { SettingEditor } from ".";
import { LangName, UserSettings } from "../../../shared/api/entities";
import { Column } from "../ui";

const langNameToLabel: { [T in LangName]: string } = {
  en: "en",
  ja: "ja"
};

export const LangSettingEditor: SettingEditor<"lang"> = ({ value, onChange }) => {
  return (
    <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
      言語
      <Column className={`${Classes.SELECT} ${Classes.MODIFIER_KEY}`}>
        <select defaultValue={value || "dark"} onChange={e => onChange(e.target.value as UserSettings["lang"])}>
          {Object.entries(langNameToLabel).map(([name, label]) => (
            <option key={name} value={name}>
              {label}
            </option>
          ))}
        </select>
      </Column>
    </label>
  );
};
