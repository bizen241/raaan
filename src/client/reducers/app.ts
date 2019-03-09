import { Reducer } from "redux";
import { Actions } from ".";
import { User } from "../../shared/api/entities";
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
  ready: (currentUser: User | null) => createAction(AppActionType.Ready, { currentUser }),
  error: () => createAction(AppActionType.Error),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const appUser = getState().app.user;

  try {
    if (navigator.onLine) {
      const result = await getCurrentUser();
      const currentUser = Object.values(result.User)[0];

      dispatch(cacheActions.get(result));
      dispatch(appSyncActions.ready(currentUser || null));
    } else {
      dispatch(appSyncActions.ready(appUser));
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
  user: User | null;
  isReady: boolean;
  hasError: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  user: null,
  isReady: false,
  hasError: false,
  hasUpdate: false
};

export const appReducer: Reducer<AppState, Actions> = (state = initialAppState, action) => {
  switch (action.type) {
    case AppActionType.Ready: {
      const { currentUser } = action.payload;

      return {
        ...state,
        user: currentUser,
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
