import { Reducer } from "redux";
import { Actions } from ".";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { getCurrentUser } from "../api/client";
import { install } from "../install";
import { cacheActions } from "./cache";

export enum AppActionType {
  Ready = "app/ready",
  Error = "app/error",
  UpdateFound = "app/update-found"
}

const appSyncActions = {
  ready: (userId: string | null) => createAction(AppActionType.Ready, { userId }),
  error: () => createAction(AppActionType.Error),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const currentUserId = getState().app.userId;

  try {
    if (navigator.onLine) {
      const result = await getCurrentUser();
      const currentUser = Object.values(result.User)[0];

      dispatch(cacheActions.get(result));
      dispatch(appSyncActions.ready((currentUser && currentUser.id) || null));
    } else {
      dispatch(appSyncActions.ready(currentUserId));
    }

    if (process.env.NODE_ENV === "production") {
      install(() => dispatch(appSyncActions.updateFound()));
    }
  } catch (e) {
    dispatch(appSyncActions.error());
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export type AppState = {
  userId: string | null;
  isReady: boolean;
  hasError: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  userId: null,
  isReady: false,
  hasError: false,
  hasUpdate: false
};

export const appReducer: Reducer<AppState, Actions> = (state = initialAppState, action) => {
  switch (action.type) {
    case AppActionType.Ready: {
      const { userId } = action.payload;

      return {
        ...state,
        userId,
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
