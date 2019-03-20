import * as React from "react";
import { createContext, useEffect, useMemo } from "react";
import { User } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { connector } from "../../reducers";
import { appActions } from "../../reducers/app";

type UserContextValue = {
  id: string;
} & Required<SaveParams<User>>;

export const UserContext = createContext<UserContextValue>({
  id: Date.now().toString(),
  name: "ゲスト",
  permission: "Guest",
  settings: {}
});

export const Initializer = connector(
  state => ({
    ...state.app,
    userCache: state.cache.get.User[state.app.userId],
    userBuffer: state.buffers.User[state.app.userId]
  }),
  () => ({
    initialize: appActions.initialize
  }),
  ({ isReady, hasError, userId, userCache, userBuffer, initialize, children }) => {
    useEffect(() => {
      initialize();
    }, []);

    const currentUser = useMemo<UserContextValue | null>(() => {
      if (userBuffer !== undefined) {
        return {
          id: userId,
          name: userBuffer.edited.name || "ゲスト",
          permission: userBuffer.edited.permission || "Guest",
          settings: userBuffer.edited.settings || {}
        };
      } else if (userCache !== undefined) {
        return {
          id: userId,
          name: userCache.name,
          permission: userCache.permission,
          settings: userCache.settings || {}
        };
      } else {
        return null;
      }
    }, [userId, userCache, userBuffer]);

    if (!isReady) {
      return <div>ロード中...</div>;
    }
    if (hasError) {
      return <div>エラーが発生しています</div>;
    }
    if (currentUser == null) {
      return <div>ユーザーが見つかりませんでした</div>;
    }

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
  }
);
