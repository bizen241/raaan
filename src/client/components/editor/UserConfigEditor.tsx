import { Card, CardContent } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { UserConfig, UserSettings } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserConfigDialog } from "../dialogs/UploadUserConfigDialog";
import { defaultSettings, UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { Button, Column, Select } from "../ui";

const langToLabel: { [T in UserSettings["ui.lang"]]: string } = {
  en: "en",
  ja: "ja"
};

const colorSchemeToLabel: { [T in UserSettings["ui.colorScheme"]]: string } = {
  system: "system",
  dark: "dark",
  light: "light"
};

export const UserConfigEditor = withBuffer<UserConfig>("UserConfig")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const [settings, setSettings] = useState(buffer.settings || source.settings || {});

    const onChangeSettings = useCallback((key: string, value: string) => {
      setSettings(previousSettings => {
        const nextSettings = {
          ...previousSettings,
          [key]: value
        };

        onChange({
          settings: nextSettings
        });
        return nextSettings;
      });
    }, []);

    const canUpload = props.buffer !== undefined && currentUser.permission !== "Guest";

    return (
      <Column>
        <Column pb={1}>
          <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        </Column>
        <Card>
          <CardContent>
            <Column>
              <Column pb={1}>
                <SelectValue
                  label={<Message id="language" />}
                  name="ui.lang"
                  settings={settings}
                  onChange={onChangeSettings}
                >
                  {Object.entries(langToLabel).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </SelectValue>
              </Column>
            </Column>
            <Column pb={1}>
              <SelectValue
                label={<Message id="theme" />}
                name="ui.colorScheme"
                settings={settings}
                onChange={onChangeSettings}
              >
                {Object.entries(colorSchemeToLabel).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </SelectValue>
            </Column>
          </CardContent>
        </Card>
        <UploadUserConfigDialog userConfigId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);

export const SelectValue = React.memo<{
  label: React.ReactNode;
  name: keyof UserSettings;
  settings: Partial<UserSettings>;
  children: React.ReactNode;
  onChange: (name: keyof UserSettings, value: string) => void;
}>(({ label, name, settings, onChange, children }) => (
  <Select
    label={label}
    defaultValue={settings[name] || defaultSettings[name]}
    onChange={e => onChange(name, e.target.value)}
  >
    {children}
  </Select>
));
