import * as React from "react";
import { createContext, useEffect, useMemo } from "react";
import { User } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { connector } from "../../reducers";
import { appActions } from "../../reducers/app";

type UserContextValue = {
  currentUserId: string;
  currentUserParams: Required<SaveParams<User>>;
};

export const UserContext = createContext<UserContextValue>({
  currentUserId: Date.now().toString(),
  currentUserParams: {
    name: "ゲスト",
    permission: "Guest",
    settings: {}
  }
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

    if (!isReady) {
      return <div>ロード中...</div>;
    }
    if (hasError) {
      return <div>エラーが発生しています</div>;
    }
    if (userCache === undefined && userBuffer === undefined) {
      return <div>ユーザーが見つかりませんでした</div>;
    }

    const currentUser = useMemo<UserContextValue>(
      () => ({
        currentUserId: userId,
        currentUserParams: {
          name: (userBuffer && userBuffer.edited.name) || (userCache && userCache.name) || "ゲスト",
          permission: (userBuffer && userBuffer.edited.permission) || (userCache && userCache.permission) || "Guest",
          settings: (userBuffer && userBuffer.edited.settings) || (userCache && userCache.settings) || {}
        }
      }),
      [userId, userCache, userBuffer]
    );

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
  }
);
