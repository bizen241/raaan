import { combineReducers } from "redux";
import { AppActions, appReducer, AppState } from "./app";
import { CacheActions, cacheReducer, CacheState } from "./cache";

export interface RootState {
  app: AppState;
  cache: CacheState;
}

export const rootReducer = combineReducers({
  app: appReducer,
  cache: cacheReducer
});

export type Actions = AppActions | CacheActions;
