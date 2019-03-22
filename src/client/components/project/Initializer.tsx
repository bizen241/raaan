import * as React from "react";
import { createContext, useEffect, useMemo } from "react";
import { Permission, UserConfig } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { connector } from "../../reducers";
import { appActions } from "../../reducers/app";

type UserContextValue = {
  id: string;
  name: string;
  permission: Permission;
};

export const UserContext = createContext<UserContextValue>({
  id: Date.now().toString(),
  name: "ゲスト",
  permission: "Guest"
});

type ConfigContextValue = SaveParams<UserConfig>;

export const ConfigContext = createContext<ConfigContextValue>({});

export const Initializer = connector(
  ({ app, cache, buffers }) => ({
    ...app,
    userCache: cache.get.User[app.userId],
    userBuffer: buffers.User[app.userId],
    configCache: cache.get.UserConfig[app.configId],
    configBuffer: buffers.UserConfig[app.configId]
  }),
  () => ({
    initialize: appActions.initialize
  }),
  ({ isReady, hasError, userId, userCache, userBuffer, configCache, configBuffer, initialize, children }) => {
    useEffect(() => {
      initialize();
    }, []);

    const user = useMemo<UserContextValue | null>(() => {
      if (userBuffer !== undefined) {
        return {
          id: userId,
          name: userBuffer.edited.name || "ゲスト",
          permission: userBuffer.edited.permission || "Guest"
        };
      } else if (userCache !== undefined) {
        return {
          id: userId,
          name: userCache.name,
          permission: userCache.permission
        };
      } else {
        return null;
      }
    }, [userCache, userBuffer]);

    const config = useMemo<ConfigContextValue | null>(() => {
      if (configBuffer !== undefined) {
        return configBuffer.edited;
      } else if (configCache !== undefined) {
        return configCache;
      } else {
        return null;
      }
    }, [configCache, configBuffer]);

    if (!isReady) {
      return <div>ロード中...</div>;
    }
    if (hasError) {
      return <div>エラーが発生しています</div>;
    }
    if (user == null || config == null) {
      return <div>ユーザーが見つかりませんでした</div>;
    }

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
);
