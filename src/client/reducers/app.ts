import { Reducer } from "redux";
import { Actions } from ".";
import { User } from "../../shared/api/entities";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { getCurrentUser } from "../api/client";
import { guestUser } from "../components/project/Context";
import { install } from "../install";
import { cacheActions } from "./cache";

export enum AppActionType {
  Ready = "app/ready",
  SetUser = "app/set-user",
  UpdateFound = "app/update-found"
}

const appSyncActions = {
  ready: () => createAction(AppActionType.Ready),
  setUser: (user: User) => createAction(AppActionType.SetUser, { user }),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async dispatch => {
  try {
    if (navigator.onLine) {
      const result = await getCurrentUser();
      const currentUser = Object.values(result.User)[0];

      if (currentUser !== undefined) {
        dispatch(cacheActions.get(result));
        dispatch(appSyncActions.setUser(currentUser));
      }
    }

    if (process.env.NODE_ENV === "production") {
      install(() => dispatch(appSyncActions.updateFound()));
    }

    dispatch(appSyncActions.ready());
  } catch (e) {
    throw e;
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export type AppState = {
  userId: string;
  isReady: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  userId: guestUser.id,
  isReady: false,
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
    case AppActionType.SetUser: {
      const { user } = action.payload;

      return {
        ...state,
        userId: user.id
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
