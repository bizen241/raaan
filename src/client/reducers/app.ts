import { push } from "connected-react-router";
import { HTTPError } from "ky";
import { Reducer } from "redux";
import { Actions } from ".";
import { User, UserAccount, UserConfig } from "../../shared/api/entities";
import { getCurrentUser } from "../api/client";
import { guestUser, guestUserAccount, guestUserConfig } from "../components/project/Context";
import { install } from "../install";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { isLocalOnly } from "./api";
import { cacheActions } from "./cache";

export enum AppActionType {
  Ready = "app/ready",
  Network = "app/network",
  UpdateFound = "app/update-found"
}

const appSyncActions = {
  ready: (user: User, account: UserAccount, config: UserConfig) =>
    createAction(AppActionType.Ready, { user, account, config }),
  network: (isOnline: boolean) => createAction(AppActionType.Network, { isOnline }),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const state = getState();
  const appState = state.app;

  if (process.env.NODE_ENV === "production") {
    install(() => dispatch(appSyncActions.updateFound()));
  }

  window.addEventListener("online", () => dispatch(appSyncActions.network(true)));
  window.addEventListener("offline", () => dispatch(appSyncActions.network(false)));

  window.addEventListener("quotaexceeded", () => dispatch(cacheActions.purge(undefined, undefined)));

  try {
    const result = await getCurrentUser();
    const nextUser = result.User && Object.values(result.User)[0];
    const nextUserAccount = result.UserAccount && Object.values(result.UserAccount)[0];
    const nextUserConfig = result.UserConfig && Object.values(result.UserConfig)[0];

    if (nextUser === undefined || nextUserAccount === undefined || nextUserConfig === undefined) {
      throw new Error();
    }

    if (nextUser.id !== appState.userId) {
      dispatch(push("/"));
    }

    dispatch(cacheActions.get(result));
    dispatch(appSyncActions.ready(nextUser, nextUserAccount, nextUserConfig));
  } catch (e) {
    if (e instanceof HTTPError && e.response.status === 403 && !isLocalOnly(appState.userId)) {
      localStorage.clear();
      location.reload();

      return;
    }

    const prevUser = state.cache.get.User[appState.userId];
    const prevUserAccount = state.cache.get.UserAccount[appState.userAccountId];
    const prevUserConfig = state.cache.get.UserConfig[appState.userConfigId];

    if (prevUser !== undefined && prevUserAccount !== undefined && prevUserConfig !== undefined) {
      dispatch(appSyncActions.ready(prevUser, prevUserAccount, prevUserConfig));
    } else {
      dispatch(appSyncActions.ready(guestUser, guestUserAccount, guestUserConfig));
    }
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export type AppState = {
  userId: string;
  userConfigId: string;
  userAccountId: string;
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
  hasUpdate: false
};

export const appReducer: Reducer<AppState, Actions> = (state = initialAppState, action) => {
  switch (action.type) {
    case AppActionType.Ready: {
      const { user, config, account } = action.payload;

      return {
        ...state,
        userId: user.id,
        userAccountId: account.id,
        userConfigId: config.id,
        isReady: true,
        isOnline: navigator.onLine,
        hasUpdate: false
      };
    }
    case AppActionType.Network: {
      const { isOnline } = action.payload;

      return {
        ...state,
        isOnline
      };
    }
    case AppActionType.UpdateFound: {
      return {
        ...state,
        hasUpdate: true
      };
    }
    default:
      return state;
  }
};
