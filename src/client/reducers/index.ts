import { combineReducers } from "redux";
import { CacheActions, cacheReducer, CacheState } from "./cache";

export interface RootState {
  cache: CacheState;
}

export const rootReducer = combineReducers({
  cache: cacheReducer
});

export type Actions = CacheActions;
