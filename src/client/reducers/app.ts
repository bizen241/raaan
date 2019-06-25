import { push } from "connected-react-router";
import { Reducer } from "redux";
import { Actions } from ".";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { getCurrentUser } from "../api/client";
import { guestUser } from "../components/project/Context";
import { install } from "../install";
import { cacheActions } from "./cache";

export enum AppActionType {
  Ready = "app/ready",
  Network = "app/network",
  UpdateFound = "app/update-found"
}

const appSyncActions = {
  ready: (userId: string) => createAction(AppActionType.Ready, { userId }),
  network: (isOnline: boolean) => createAction(AppActionType.Network, { isOnline }),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const previousUserId = getState().app.userId;

  if (process.env.NODE_ENV === "production") {
    install(() => dispatch(appSyncActions.updateFound()));
  }

  window.addEventListener("online", () => dispatch(appSyncActions.network(true)));
  window.addEventListener("offline", () => dispatch(appSyncActions.network(false)));

  try {
    const result = await getCurrentUser();
    const currentUser = Object.values(result.User)[0];

    if (currentUser === undefined) {
      throw new Error();
    }

    if (currentUser.id !== previousUserId) {
      dispatch(push("/"));
    }

    dispatch(cacheActions.get(result));
    dispatch(appSyncActions.ready(currentUser.id));
  } catch (e) {
    dispatch(appSyncActions.ready(previousUserId));
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export type AppState = {
  userId: string;
  isReady: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  userId: guestUser.id,
  isReady: false,
  isOnline: true,
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
