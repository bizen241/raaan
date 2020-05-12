import { CloudUpload } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { EntityId, UserSettings } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserConfigDialog } from "../dialogs/user-configs/UploadUserConfigDialog";
import { Button, Card, Column, Select, SelectOptions } from "../ui";

const selectLangOptions: SelectOptions<UserSettings["ui.lang"]> = {
  en: {
    label: "en",
  },
  ja: {
    label: "ja",
  },
};

const selectColorSchemeOptions: SelectOptions<UserSettings["ui.colorScheme"]> = {
  system: {
    label: "system",
  },
  dark: {
    label: "dark",
  },
  light: {
    label: "light",
  },
};

const selectAccentColorOptions: SelectOptions<UserSettings["ui.accentColor"]> = {
  red: {
    label: "red",
  },
  pink: {
    label: "pink",
  },
  purple: {
    label: "purple",
  },
};

export const UserConfigEditor = React.memo<{
  userConfigId: EntityId<"UserConfig">;
}>(({ userConfigId }) => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();

  const { buffer, params, onChange } = useBuffer("UserConfig", userConfigId);
  const [settings, setSettings] = useState(params.settings || {});

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onChangeSettings = useCallback((key: string, value: string) => {
    setSettings((previousSettings) => {
      const nextSettings = {
        ...previousSettings,
        [key]: value,
      };

      onChange({
        settings: nextSettings,
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
          label={t("editor.UserConfigEditor.label.language")}
          options={selectLangOptions}
          defaultValue={settings["ui.lang"]}
          onChange={(value) => onChangeSettings("ui.lang", value)}
        />
        <Select<UserSettings["ui.colorScheme"]>
          label={t("editor.UserConfigEditor.label.theme")}
          options={selectColorSchemeOptions}
          defaultValue={settings["ui.colorScheme"]}
          onChange={(value) => onChangeSettings("ui.colorScheme", value)}
        />
        <Select<UserSettings["ui.accentColor"]>
          label={t("editor.UserConfigEditor.label.theme")}
          options={selectAccentColorOptions}
          defaultValue={settings["ui.accentColor"]}
          onChange={(value) => onChangeSettings("ui.accentColor", value)}
        />
      </Card>
      <UploadUserConfigDialog userConfigId={userConfigId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
    </Column>
  );
});
