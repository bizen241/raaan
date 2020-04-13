import { push } from "connected-react-router";
import { Reducer } from "redux";
import { Actions } from ".";
import { EntityId } from "../../shared/api/entities";
import { getCurrentUser } from "../api/client";
import { install } from "../install";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { cacheActions } from "./cache";
import { guestUser, guestUserAccount, guestUserConfig } from "./guest";

export enum AppActionType {
  Ready = "app/ready",
  Network = "app/network",
  Update = "app/update",
}

const appSyncActions = {
  ready: (params: {
    userId: EntityId<"User">;
    userAccountId: EntityId<"UserAccount">;
    userConfigId: EntityId<"UserConfig">;
  }) => createAction(AppActionType.Ready, params),
  network: (isOnline: boolean) => createAction(AppActionType.Network, isOnline),
  update: () => createAction(AppActionType.Update),
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const state = getState();
  const { userId: prevUserId, userConfigId: prevUserConfigId, userAccountId: prevUserAccountId } = state.app;

  if (process.env.NODE_ENV === "production") {
    install(() => dispatch(appSyncActions.update()));
  }

  window.addEventListener("online", () => dispatch(appSyncActions.network(true)));
  window.addEventListener("offline", () => dispatch(appSyncActions.network(false)));

  window.addEventListener("quotaexceeded", () => dispatch(cacheActions.purge(undefined, undefined)));

  try {
    const result = await getCurrentUser();
    const nextUserId = result.User && (Object.keys(result.User)[0] as EntityId<"User">);
    const nextUserAccountId = result.UserAccount && (Object.keys(result.UserAccount)[0] as EntityId<"UserAccount">);
    const nextUserConfigId = result.UserConfig && (Object.keys(result.UserConfig)[0] as EntityId<"UserConfig">);

    if (nextUserId === undefined || nextUserAccountId === undefined || nextUserConfigId === undefined) {
      throw new Error();
    }

    if (nextUserId !== prevUserId) {
      dispatch(push("/"));
    }

    dispatch(cacheActions.get(result));
    dispatch(
      appSyncActions.ready({
        userId: nextUserId,
        userAccountId: nextUserAccountId,
        userConfigId: nextUserConfigId,
      })
    );
  } catch (e) {
    const prevUser = state.cache.get.User[prevUserId];
    const prevUserAccount = state.cache.get.UserAccount[prevUserAccountId];
    const prevUserConfig = state.cache.get.UserConfig[prevUserConfigId];

    if (prevUser !== undefined && prevUserAccount !== undefined && prevUserConfig !== undefined) {
      dispatch(
        appSyncActions.ready({
          userId: prevUserId,
          userAccountId: prevUserAccountId,
          userConfigId: prevUserConfigId,
        })
      );
    } else {
      dispatch(
        appSyncActions.ready({
          userId: guestUser.id,
          userAccountId: guestUserAccount.id,
          userConfigId: guestUserConfig.id,
        })
      );
    }
  }
};

export const appActions = {
  ...appSyncActions,
  initialize,
};

export type AppState = {
  userId: EntityId<"User">;
  userConfigId: EntityId<"UserConfig">;
  userAccountId: EntityId<"UserAccount">;
  isReady: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  userId: guestUser.id,
  userConfigId: guestUserConfig.id,
  userAccountId: guestUserAccount.id,
  isReady: false,
  isOnline: true,
  hasUpdate: false,
};

export const appReducer: Reducer<AppState, Actions> = (state = initialAppState, action) => {
  switch (action.type) {
    case AppActionType.Ready: {
      const { userId, userConfigId, userAccountId } = action.payload;

      return {
        userId,
        userConfigId,
        userAccountId,
        isReady: true,
        isOnline: navigator.onLine,
        hasUpdate: false,
      };
    }
    case AppActionType.Network: {
      const isOnline = action.payload;

      return {
        ...state,
        isOnline,
      };
    }
    case AppActionType.Update: {
      return {
        ...state,
        hasUpdate: true,
      };
    }
    default:
      return state;
  }
};
