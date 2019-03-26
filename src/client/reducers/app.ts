import { Reducer } from "redux";
import { Actions } from ".";
import { User, UserConfig } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { getCurrentUser } from "../api/client";
import { install } from "../install";
import { buffersActions } from "./buffers";
import { cacheActions } from "./cache";

export enum AppActionType {
  Ready = "app/ready",
  Error = "app/error",
  SetUser = "app/set-user",
  UpdateFound = "app/update-found"
}

const appSyncActions = {
  ready: () => createAction(AppActionType.Ready),
  error: () => createAction(AppActionType.Error),
  setUser: (user: User) => createAction(AppActionType.SetUser, { user }),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  try {
    const beforeState = getState();
    const beforeUserId = beforeState.app.userId;
    const beforeConfigId = beforeState.app.configId;
    const beforeUserBuffer = beforeState.buffers.User[beforeUserId];
    const beforeConfigBuffer = beforeState.buffers.UserConfig[beforeConfigId];

    if (navigator.onLine) {
      const result = await getCurrentUser();
      const nextUser = Object.values(result.User)[0];

      if (nextUser !== undefined && nextUser.permission !== "Guest") {
        dispatch(cacheActions.get(result));
        dispatch(appSyncActions.setUser(nextUser));
      }
    }

    const nextState = getState();
    const nextUserId = nextState.app.userId;
    const nextConfigId = nextState.app.configId;
    const nextUserCache = nextState.cache.get.User[nextUserId];
    const nextConfigCache = nextState.cache.get.UserConfig[nextConfigId];

    if (nextUserCache === undefined && beforeUserBuffer === undefined) {
      const nextUserBuffer: Required<SaveParams<User>> = {
        name: "",
        permission: "Guest",
        configId: nextConfigId
      };

      dispatch(buffersActions.add<User>("User", nextUserId, nextUserBuffer));
    }
    if (nextConfigCache === undefined && beforeConfigBuffer === undefined) {
      const nextConfigBuffer: SaveParams<UserConfig> = {};

      dispatch(buffersActions.add<UserConfig>("UserConfig", nextConfigId, nextConfigBuffer));
    }

    if (nextUserCache !== undefined && beforeUserBuffer !== undefined) {
      const { permission } = beforeUserBuffer.edited;

      if (permission === "Guest") {
        dispatch(buffersActions.delete("User", beforeUserId));
        dispatch(buffersActions.delete("UserConfig", beforeConfigId));
      }
    }

    if (process.env.NODE_ENV === "production") {
      install(() => dispatch(appSyncActions.updateFound()));
    }

    dispatch(appSyncActions.ready());
  } catch (e) {
    dispatch(appSyncActions.error());
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export type AppState = {
  userId: string;
  configId: string;
  isReady: boolean;
  hasError: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  userId: Date.now().toString(),
  configId: Date.now().toString(),
  isReady: false,
  hasError: false,
  hasUpdate: false
};

export const appReducer: Reducer<AppState, Actions> = (state = initialAppState, action) => {
  switch (action.type) {
    case AppActionType.Ready: {
      return {
        ...state,
        isReady: true,
        hasUpdate: false
      };
    }
    case AppActionType.Error: {
      return {
        ...state,
        hasError: true
      };
    }
    case AppActionType.SetUser: {
      const { user } = action.payload;

      return {
        ...state,
        userId: user.id,
        configId: user.configId
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
