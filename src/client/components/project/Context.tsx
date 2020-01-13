import React, { createContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Lang, User, UserAccount, UserConfig, UserSettings } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";

const guestUserId = Date.now().toString();
const guestUserAccountId = Date.now().toString();
const guestUserConfigId = Date.now().toString();

export const guestUser: User = {
  id: guestUserId,
  name: "",
  permission: "Guest",
  summaryId: "",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserAccount: UserAccount = {
  id: guestUserAccountId,
  provider: "github",
  accountId: "",
  email: "guest@example.com",
  avatar: "identicon",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserConfig: UserConfig = {
  id: guestUserConfigId,
  settings: {},
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};

export const defaultSettings: UserSettings = {
  "ui.lang": navigator.language.slice(0, 2) as Lang,
  "ui.colorScheme": "system",
  "ui.avatar": "gravatar"
};

export const UserContext = createContext<User>(guestUser);
export const SettingsContext = createContext<UserSettings>(defaultSettings);

export const Context = React.memo<{
  user: User;
  userConfig: UserConfig;
  userConfigBuffer: Params<UserConfig> | undefined;
  children: React.ReactNode;
}>(({ user, userConfig, userConfigBuffer, children }) => {
  const { i18n } = useTranslation();

  const userSettings = useMemo(
    (): UserSettings => ({
      ...defaultSettings,
      ...((userConfigBuffer && userConfigBuffer.settings) || userConfig.settings)
    }),
    [userConfig, userConfigBuffer]
  );

  useEffect(() => {
    i18n.changeLanguage(userSettings["ui.lang"]);
  }, [userSettings["ui.lang"]]);

  return (
    <UserContext.Provider value={user}>
      <SettingsContext.Provider value={userSettings}>{children}</SettingsContext.Provider>
    </UserContext.Provider>
  );
});
