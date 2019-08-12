import { Box, Card, CardContent, NativeSelect, OutlinedInput, Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { createEntityEditor } from ".";
import { Lang, Theme, UserConfig } from "../../../shared/api/entities";
import { Message } from "../project/Message";

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
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" pb={1}>
              <Box display="flex" flexDirection="column" component="label">
                <Typography color="textSecondary">
                  <Message id="language" />
                </Typography>
                <NativeSelect
                  input={<OutlinedInput labelWidth={0} />}
                  value={buffer.lang || source.lang || "default"}
                  onChange={onUpdateLang}
                >
                  {Object.entries(langNameToLabel).map(([name, label]) => (
                    <option key={name} value={name}>
                      {label}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" pb={1}>
              <Box display="flex" flexDirection="column" component="label">
                <Typography color="textSecondary">
                  <Message id="theme" />
                </Typography>
                <NativeSelect
                  input={<OutlinedInput labelWidth={0} />}
                  value={buffer.theme || source.theme || "default"}
                  onChange={onUpdateTheme}
                >
                  {Object.entries(themeNameToLabel).map(([name, label]) => (
                    <option key={name} value={name}>
                      {label}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  })
);
