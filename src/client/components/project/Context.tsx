import * as React from "react";
import { createContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { Lang, LangName, User, UserConfig } from "../../../shared/api/entities";
import { RootState } from "../../reducers";

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
  children: React.ReactNode;
}>(({ children }) => {
  const { user, userBuffer, userConfig, userConfigBuffer } = useSelector(({ app, cache, buffers }: RootState) => ({
    user: cache.get.User[app.user.id],
    userBuffer: buffers.User[app.user.id],
    userConfig: cache.get.UserConfig[app.user.configId],
    userConfigBuffer: buffers.UserConfig[app.user.configId]
  }));
  if (user === undefined || userConfig === undefined) {
    throw new Error("ユーザーの取得に失敗しました");
  }

  const mergedUser = useMemo<User>(
    () => ({
      ...user,
      ...userBuffer
    }),
    [user, userBuffer]
  );
  const mergedUserConfig = useMemo<UserConfig>(
    () => ({
      ...userConfig,
      ...userConfigBuffer
    }),
    [userConfig, userConfigBuffer]
  );

  const lang = getLang(mergedUserConfig.lang);

  return (
    <UserContext.Provider value={mergedUser}>
      <ConfigContext.Provider value={mergedUserConfig}>
        <LangContext.Provider value={lang}>{children}</LangContext.Provider>
      </ConfigContext.Provider>
    </UserContext.Provider>
  );
});

const getLang = (lang: Lang | undefined) =>
  lang === "default" || lang === "system" || lang === undefined ? (navigator.language.slice(0, 2) as LangName) : lang;
