import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { UserSettings } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadUserConfigDialog } from "../dialogs/user-configs/UploadUserConfigDialog";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { Button, Card, Column, Select, SelectOptions } from "../ui";

const selectLangOptions: SelectOptions<UserSettings["ui.lang"]> = {
  en: {
    label: "en"
  },
  ja: {
    label: "ja"
  }
};

const selectColorSchemeOptions: SelectOptions<UserSettings["ui.colorScheme"]> = {
  system: {
    label: "system"
  },
  dark: {
    label: "dark"
  },
  light: {
    label: "light"
  }
};

export const UserConfigEditor = withBuffer("UserConfig")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const currentUser = useContext(UserContext);
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const params = mergeBuffer(source, buffer);

    const [settings, setSettings] = useState(params.settings || {});

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

    const canUpload = buffer !== undefined && currentUser.permission !== "Guest";

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <Select<UserSettings["ui.lang"]>
            label={<Message id="language" />}
            options={selectLangOptions}
            defaultValue={settings["ui.lang"]}
            onChange={value => onChangeSettings("ui.lang", value)}
          />
          <Select<UserSettings["ui.colorScheme"]>
            label={<Message id="theme" />}
            options={selectColorSchemeOptions}
            defaultValue={settings["ui.colorScheme"]}
            onChange={value => onChangeSettings("ui.colorScheme", value)}
          />
        </Card>
        <UploadUserConfigDialog userConfigId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
