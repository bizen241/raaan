import * as React from "react";
import { createContext, useMemo } from "react";
import { Lang, LangName, User, UserConfig } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";

const guestUserId = Date.now().toString();
const guestUserConfigId = Date.now().toString();

export const guestUser: User = {
  id: guestUserId,
  name: "",
  permission: "Guest",
  accountId: "",
  configId: guestUserConfigId,
  summaryId: "",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserConfig: UserConfig = {
  id: guestUserConfigId,
  lang: "default",
  theme: "default",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};

export const UserContext = createContext<User>(guestUser);
export const ConfigContext = createContext<UserConfig>(guestUserConfig);
export const LangContext = createContext<LangName>("ja");

export const Context = React.memo<{
  user?: User;
  userParams?: SaveParams<User>;
  config?: UserConfig;
  configParams?: SaveParams<UserConfig>;
  children: React.ReactNode;
}>(({ user, userParams = {}, config, configParams = {}, children }) => {
  const mergedUser = useMemo<User>(
    () =>
      user !== undefined
        ? {
            ...user,
            ...userParams
          }
        : guestUser,
    [user, userParams]
  );
  const mergedConfig = useMemo<UserConfig>(
    () =>
      config !== undefined
        ? {
            ...config,
            ...configParams
          }
        : guestUserConfig,
    [config, configParams]
  );

  const lang = getLang(mergedConfig.lang);

  return (
    <UserContext.Provider value={mergedUser}>
      <ConfigContext.Provider value={mergedConfig}>
        <LangContext.Provider value={lang}>{children}</LangContext.Provider>
      </ConfigContext.Provider>
    </UserContext.Provider>
  );
});

const getLang = (lang: Lang | undefined) =>
  lang === "default" || lang === "system" || lang === undefined ? (navigator.language.slice(0, 2) as LangName) : lang;
