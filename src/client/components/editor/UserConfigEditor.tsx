import { Box, MenuItem } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { createEntityEditor } from ".";
import { Lang, Theme, UserConfig } from "../../../shared/api/entities";
import { Message } from "../project/Message";
import { Select } from "../ui/Select";

const langNameToLabel: { [T in Lang]: string } = {
  default: "default",
  system: "system",
  en: "en",
  ja: "ja"
};

const themeNameToLabel: { [T in Theme]: string } = {
  default: "default",
  system: "system",
  dark: "dark",
  light: "light"
};

export const UserConfigEditor = createEntityEditor<UserConfig>(
  "UserConfig",
  React.memo(({ buffer, source = {}, onChange }) => {
    const onUpdateLang = useCallback(
      (e: React.ChangeEvent<{ value: unknown }>) => onChange({ lang: e.target.value as Lang }),
      []
    );
    const onUpdateTheme = useCallback(
      (e: React.ChangeEvent<{ value: unknown }>) => onChange({ theme: e.target.value as Theme }),
      []
    );

    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" pb={1}>
          <Select
            id="lang"
            label={<Message id="language" />}
            value={buffer.lang || source.lang || "default"}
            onChange={onUpdateLang}
          >
            {Object.entries(langNameToLabel).map(([name, label]) => (
              <MenuItem key={name} value={name}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Select
            id="theme"
            label={<Message id="theme" />}
            value={buffer.theme || source.theme || "default"}
            onChange={onUpdateTheme}
          >
            {Object.entries(themeNameToLabel).map(([name, label]) => (
              <MenuItem key={name} value={name}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    );
  })
);
