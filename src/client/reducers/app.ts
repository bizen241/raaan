import { push } from "connected-react-router";
import { HTTPError } from "ky";
import { Reducer } from "redux";
import { Actions } from ".";
import { User } from "../../shared/api/entities";
import { getCurrentUser } from "../api/client";
import { guestUser } from "../components/project/Context";
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
  ready: (user: Pick<User, "id" | "configId">) => createAction(AppActionType.Ready, { user }),
  network: (isOnline: boolean) => createAction(AppActionType.Network, { isOnline }),
  updateFound: () => createAction(AppActionType.UpdateFound)
};

export type AppActions = ActionUnion<typeof appSyncActions>;

const initialize = (): AsyncAction => async (dispatch, getState) => {
  const previousUser = getState().app.user;

  if (process.env.NODE_ENV === "production") {
    install(() => dispatch(appSyncActions.updateFound()));
  }

  window.addEventListener("online", () => dispatch(appSyncActions.network(true)));
  window.addEventListener("offline", () => dispatch(appSyncActions.network(false)));

  window.addEventListener("quotaexceeded", e => console.log(e));

  try {
    const result = await getCurrentUser();
    const currentUser = result.User && Object.values(result.User)[0];

    if (currentUser === undefined) {
      throw new Error();
    }

    if (currentUser.id !== previousUser.id) {
      dispatch(push("/"));
    }

    dispatch(cacheActions.get(result));
    dispatch(appSyncActions.ready(currentUser));
  } catch (e) {
    if (e instanceof HTTPError && e.response.status === 403) {
      if (isLocalOnly(previousUser.id)) {
        dispatch(appSyncActions.ready(previousUser));
      } else {
        dispatch(appSyncActions.ready(guestUser));
      }
    } else {
      dispatch(appSyncActions.ready(previousUser));
    }
  }
};

export const appActions = {
  ...appSyncActions,
  initialize
};

export type AppState = {
  user: {
    id: string;
    configId: string;
  };
  isReady: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
};

export const initialAppState: AppState = {
  user: {
    id: guestUser.id,
    configId: guestUser.configId
  },
  isReady: false,
  isOnline: true,
  hasUpdate: false
};

export const appReducer: Reducer<AppState, Actions> = (state = initialAppState, action) => {
  switch (action.type) {
    case AppActionType.Ready: {
      const { user } = action.payload;

      return {
        ...state,
        user: {
          id: user.id,
          configId: user.configId
        },
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
