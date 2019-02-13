import { Reducer } from "redux";
import { Actions } from ".";
import { User } from "../../shared/api/entities";
import { ActionUnion, AsyncAction, createAction } from "../actions/helpers";
import { getCurrentUser } from "../api/client";
import { install } from "../install";
import { cacheActions } from "./cache";

export enum AppActionType {
  Ready = "app/ready",
  UpdateFound = "app/update-found"
}

const appSyncActions = {
  ready: (currentUser: User) => createAction(AppActionType.Ready, { currentUser }),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const appUser = getState().app.user;

  try {
    if (navigator.onLine) {
      const result = await getCurrentUser();
      const currentUser = Object.values(result.User)[0];

      dispatch(cacheActions.mergeGetResult(result));
      dispatch(appSyncActions.ready(currentUser || appUser));
    } else {
      dispatch(appSyncActions.ready(appUser));
    }

    if (process.env.NODE_ENV === "production") {
      install(() => dispatch(appSyncActions.updateFound()));
    }
  } catch (e) {
    console.log(e);
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export interface AppState {
  user: User;
  isReady: boolean;
  hasUpdate: boolean;
}

const now = Date.now();

export const initialAppState: AppState = {
  user: {
    id: now.toString(),
    name: "",
    permission: "Guest",
    createdAt: now,
    updatedAt: now,
    fetchedAt: now
  },
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
