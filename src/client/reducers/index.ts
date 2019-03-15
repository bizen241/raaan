import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { ApiActions, apiReducer, ApiState } from "./api";
import { AppActions, appReducer, AppState } from "./app";
import { BuffersActions, buffersReducer, BuffersState } from "./buffers";
import { CacheActions, cacheReducer, CacheState } from "./cache";
import { DialogActions, dialogReducer, DialogState } from "./dialog";
import { PlayerActions, playerReducer, PlayerState } from "./player";

export interface RootState {
  api: ApiState;
  app: AppState;
  buffers: BuffersState;
  cache: CacheState;
  dialog: DialogState;
  player: PlayerState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    api: apiReducer,
    app: appReducer,
    buffers: buffersReducer,
    cache: cacheReducer,
    dialog: dialogReducer,
    player: playerReducer,
    router: connectRouter(history)
  });

export type Actions =
  | ApiActions
  | AppActions
  | BuffersActions
  | CacheActions
  | DialogActions
  | PlayerActions
  | RouterAction;

export const connector = <OwnProps extends {}, SelectedState extends {}, SelectedActions extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => SelectedState,
  actionSelector: () => SelectedActions,
  component: ComponentType<SelectedState & SelectedActions>
) =>
  connect(
    stateSelector,
    actionSelector()
  )(React.memo(component) as any);
