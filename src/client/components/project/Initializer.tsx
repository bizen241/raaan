import * as React from "react";
import { createContext, useEffect, useMemo } from "react";
import { Permission, User, UserConfig } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { connector } from "../../reducers";
import { appActions } from "../../reducers/app";
import { Buffer } from "../../reducers/buffers";

type UserContextValue = {
  id: string;
  name: string;
  permission: Permission;
};

export const UserContext = createContext<UserContextValue>({
  id: Date.now().toString(),
  name: "",
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

    const user = useUser(userId, userCache, userBuffer);
    const config = useConfig(configCache, configBuffer);

    if (!isReady) {
      return <div>ロード中...</div>;
    }
    if (hasError) {
      throw new Error();
    }
    if (user == null || config == null) {
      throw new Error();
    }

    return (
      <UserContext.Provider value={user}>
        <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
      </UserContext.Provider>
    );
  }
);

const useUser = (userId: string, cache: User | undefined, buffer: Buffer<User> | undefined) =>
  useMemo<UserContextValue | null>(() => {
    if (buffer !== undefined) {
      return {
        id: userId,
        name: buffer.edited.name || "ゲスト",
        permission: buffer.edited.permission || "Guest"
      };
    } else if (cache !== undefined) {
      return {
        id: userId,
        name: cache.name,
        permission: cache.permission
      };
    } else {
      return null;
    }
  }, [cache, buffer]);

const useConfig = (cache: UserConfig | undefined, buffer: Buffer<UserConfig> | undefined) =>
  useMemo<ConfigContextValue | null>(() => {
    if (buffer !== undefined) {
      return buffer.edited;
    } else if (cache !== undefined) {
      return cache;
    } else {
      return null;
    }
  }, [cache, buffer]);
