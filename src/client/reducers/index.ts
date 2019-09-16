import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { ApiActions, apiActions, apiReducer, ApiState } from "./api";
import { AppActions, appActions, appReducer, AppState } from "./app";
import { BuffersActions, buffersActions, buffersReducer, BuffersState } from "./buffers";
import { CacheActions, cacheActions, cacheReducer, CacheState } from "./cache";

export interface RootState {
  api: ApiState;
  app: AppState;
  buffers: BuffersState;
  cache: CacheState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    api: apiReducer,
    app: appReducer,
    buffers: buffersReducer,
    cache: cacheReducer,
    router: connectRouter(history)
  });

export type Actions = ApiActions | AppActions | BuffersActions | CacheActions | RouterAction;

export const actions = {
  api: apiActions,
  app: appActions,
  buffers: buffersActions,
  cache: cacheActions
};
