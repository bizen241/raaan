import { Card, CardContent } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { Lang, Theme, UserConfig } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserConfigDialog } from "../dialogs/UploadUserConfigDialog";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { Button, Column, Select } from "../ui";

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

export const UserConfigEditor = withBuffer<UserConfig>(
  "UserConfig",
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateLang = useCallback(
      (e: React.ChangeEvent<{ value: unknown }>) => onChange({ lang: e.target.value as Lang }),
      []
    );
    const onUpdateTheme = useCallback(
      (e: React.ChangeEvent<{ value: unknown }>) => onChange({ theme: e.target.value as Theme }),
      []
    );

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
                <Select
                  label={<Message id="language" />}
                  defaultValue={buffer.lang || source.lang || "default"}
                  onChange={onUpdateLang}
                >
                  {Object.entries(langNameToLabel).map(([name, label]) => (
                    <option key={name} value={name}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Column>
            </Column>
            <Column pb={1}>
              <Select
                label={<Message id="theme" />}
                defaultValue={buffer.theme || source.theme || "default"}
                onChange={onUpdateTheme}
              >
                {Object.entries(themeNameToLabel).map(([name, label]) => (
                  <option key={name} value={name}>
                    {label}
                  </option>
                ))}
              </Select>
            </Column>
          </CardContent>
        </Card>
        <UploadUserConfigDialog userConfigId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
