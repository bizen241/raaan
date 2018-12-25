import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { AppActions, appReducer, AppState } from "./app";
import { CacheActions, cacheReducer, CacheState } from "./cache";

export interface RootState {
  app: AppState;
  cache: CacheState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    app: appReducer,
    cache: cacheReducer,
    router: connectRouter(history)
  });

export type Actions = AppActions | CacheActions | RouterAction;

export const connector = <OwnProps extends {}, SelectedState extends {}, SelectedActions extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => SelectedState,
  actionSelector: () => SelectedActions,
  component: ComponentType<SelectedState & SelectedActions>
) =>
  connect(
    stateSelector,
    actionSelector()
  )(component as any);
