import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@material-ui/core";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from ".";
import { Lang, Theme, UserConfig } from "../../../shared/api/entities";
import { actions } from "../../reducers";
import { Message } from "../project/Message";

export const UserConfigEditor = React.memo<EntityEditorContainerProps>(props => (
  <EntityEditor {...props} entityType="UserConfig" rendererComponent={UserConfigEditorRenderer} />
));

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

const UserConfigEditorRenderer = React.memo<EntityEditorRendererProps<UserConfig>>(({ bufferId, buffer }) => {
  const dispatch = useDispatch();

  const { lang, theme } = buffer.edited;

  const langInputLabel = useRef<HTMLLabelElement>(null);
  const [langLabelWidth, setLangLabelWidth] = useState(0);
  useEffect(() => {
    if (langInputLabel.current != null) {
      setLangLabelWidth(langInputLabel.current.offsetWidth);
    }
  }, [lang]);

  const themeInputLabel = useRef<HTMLLabelElement>(null);
  const [themeLabelWidth, setThemeLabelWidth] = useState(0);
  useEffect(() => {
    if (themeInputLabel.current != null) {
      setThemeLabelWidth(themeInputLabel.current.offsetWidth);
    }
  }, [lang]);

  const onUpdateLang = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) =>
      dispatch(actions.buffers.updateValue<UserConfig>("UserConfig", bufferId, "lang", e.target.value as Lang)),
    []
  );
  const onUpdateTheme = useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) =>
      dispatch(actions.buffers.updateValue<UserConfig>("UserConfig", bufferId, "theme", e.target.value as Theme)),
    []
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" py={1}>
        <FormControl variant="outlined">
          <InputLabel ref={langInputLabel} htmlFor="lang">
            <Message id="language" />
          </InputLabel>
          <Select
            input={<OutlinedInput labelWidth={langLabelWidth} id="lang" />}
            value={lang || "default"}
            onChange={onUpdateLang}
          >
            {Object.entries(langNameToLabel).map(([name, label]) => (
              <MenuItem key={name} value={name}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="column" py={1}>
        <FormControl variant="outlined">
          <InputLabel ref={themeInputLabel} htmlFor="theme">
            <Message id="theme" />
          </InputLabel>
          <Select
            input={<OutlinedInput labelWidth={themeLabelWidth} id="theme" />}
            value={theme || "default"}
            onChange={onUpdateTheme}
          >
            {Object.entries(themeNameToLabel).map(([name, label]) => (
              <MenuItem key={name} value={name}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
});
