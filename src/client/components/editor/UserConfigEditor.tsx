import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@material-ui/core";
import * as React from "react";
import { EntityEditor, EntityEditorContainerProps, EntityEditorRendererProps } from ".";
import { Lang, Theme, UserConfig } from "../../../shared/api/entities";
import { userConfigActions } from "../../actions/userConfig";
import { connector } from "../../reducers";
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

const UserConfigEditorRenderer = connector(
  (_, ownProps: EntityEditorRendererProps<UserConfig>) => ({
    ...ownProps
  }),
  () => ({
    ...userConfigActions
  }),
  ({ bufferId, buffer, updateLang, updateTheme }) => {
    const { lang, theme } = buffer.edited;

    const langInputLabel = React.useRef<HTMLLabelElement>(null);
    const [langLabelWidth, setLangLabelWidth] = React.useState(0);
    React.useEffect(() => {
      if (langInputLabel.current != null) {
        setLangLabelWidth(langInputLabel.current.offsetWidth);
      }
    }, [lang]);

    const themeInputLabel = React.useRef<HTMLLabelElement>(null);
    const [themeLabelWidth, setThemeLabelWidth] = React.useState(0);
    React.useEffect(() => {
      if (themeInputLabel.current != null) {
        setThemeLabelWidth(themeInputLabel.current.offsetWidth);
      }
    }, [lang]);

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
              onChange={React.useCallback(
                (e: React.ChangeEvent<{ value: unknown }>) => updateLang(bufferId, e.target.value as Lang),
                []
              )}
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
              onChange={React.useCallback(
                (e: React.ChangeEvent<{ value: unknown }>) => updateTheme(bufferId, e.target.value as Theme),
                []
              )}
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
  }
);
