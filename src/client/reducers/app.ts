import { Reducer } from "redux";
import { Actions } from ".";
import { User } from "../../shared/api/entities";
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
  setUser: (userId?: string) => createAction(AppActionType.SetUser, { userId }),
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
        dispatch(appSyncActions.setUser(nextUser.id));
      }
    }

    const state = getState();
    const currentUserId = state.app.userId;
    const currentUserCache = state.cache.get.User[currentUserId];

    if (currentUserCache === undefined) {
      const currentUserBuffer = state.buffers.User[currentUserId];

      if (currentUserBuffer === undefined) {
        const buffer: Required<SaveParams<User>> = {
          name: "ゲスト",
          permission: "Guest",
          settings: {}
        };

        dispatch(buffersActions.add<User>("User", currentUserId, buffer));
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
  isReady: boolean;
  hasError: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  userId: Date.now().toString(),
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
      const { userId } = action.payload;

      return {
        ...state,
        userId: userId || state.userId
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
