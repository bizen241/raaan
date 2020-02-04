import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Lang, UserSettings } from "../../shared/api/entities";
import { RootState } from "../reducers";

const defaultSettings: UserSettings = {
  "ui.lang": navigator.language.slice(0, 2) as Lang,
  "ui.colorScheme": "system",
  "ui.avatar": "gravatar"
};

export const useUserSettings = () => {
  const userConfig = useSelector(({ app, cache }: RootState) => cache.get.UserConfig[app.userConfigId]);
  const userConfigBuffer = useSelector(({ app, buffers }: RootState) => buffers.UserConfig[app.userConfigId]);
  if (userConfig === undefined) {
    throw new Error("userConfig is not defined");
  }

  const userSettings = useMemo(
    (): UserSettings => ({
      ...defaultSettings,
      ...((userConfigBuffer && userConfigBuffer.settings) || userConfig.settings)
    }),
    [userConfig, userConfigBuffer]
  );

  return userSettings;
};
