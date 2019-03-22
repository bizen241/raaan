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
    if (navigator.onLine) {
      const result = await getCurrentUser();
      const nextUser = Object.values(result.User)[0];

      if (nextUser !== undefined) {
        dispatch(cacheActions.get(result));
        dispatch(appSyncActions.setUser(nextUser));
      }
    }

    const state = getState();
    const currentUserId = state.app.userId;
    const currentUserCache = state.cache.get.User[currentUserId];
    const currentUserBuffer = state.buffers.User[currentUserId];

    if (currentUserCache === undefined && currentUserBuffer === undefined) {
      const currentConfigBufferId = state.app.configId;

      const newUserBuffer: Required<SaveParams<User>> = {
        name: "ゲスト",
        permission: "Guest",
        configId: currentConfigBufferId
      };
      const newConfigBuffer: SaveParams<UserConfig> = {};

      dispatch(buffersActions.add<User>("User", currentUserId, newUserBuffer));
      dispatch(buffersActions.add<UserConfig>("UserConfig", currentConfigBufferId, newConfigBuffer));
    }

    if (currentUserCache !== undefined && currentUserBuffer !== undefined) {
      const { permission, configId } = currentUserBuffer.edited;

      if (permission === "Guest" && configId !== undefined) {
        dispatch(buffersActions.delete("User", currentUserId));
        dispatch(buffersActions.delete("UserConfig", configId));
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
