import { useMemo } from "react";
import { Lang, UserSettings } from "../../shared/api/entities";
import { useSelector } from "../reducers";

const defaultSettings: UserSettings = {
  "ui.lang": navigator.language.slice(0, 2) as Lang,
  "ui.colorScheme": "system",
  "ui.avatar": "gravatar",
  "ui.accentColor": "purple",
};

export const useUserSettings = () => {
  const userConfig = useSelector((state) => state.cache.get.UserConfig[state.app.userConfigId]);
  const userConfigBuffer = useSelector((state) => state.buffers.UserConfig[state.app.userConfigId]);
  if (userConfig === undefined) {
    throw new Error("userConfig is not defined");
  }

  const userSettings = useMemo(
    (): UserSettings => ({
      ...defaultSettings,
      ...((userConfigBuffer && userConfigBuffer.settings) || userConfig.settings),
    }),
    [userConfig, userConfigBuffer]
  );

  return userSettings;
};
