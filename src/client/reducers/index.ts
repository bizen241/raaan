import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { ApiActions, apiActions, apiReducer, ApiState } from "./api";
import { AppActions, appActions, appReducer, AppState } from "./app";
import { AttemptsActions, attemptsReducer, AttemptState } from "./attempts";
import { BuffersActions, buffersActions, buffersReducer, BuffersState } from "./buffers";
import { CacheActions, cacheReducer, CacheState } from "./cache";
import { DialogActions, dialogActions, dialogReducer, DialogState } from "./dialog";

export interface RootState {
  api: ApiState;
  app: AppState;
  attempts: AttemptState;
  buffers: BuffersState;
  cache: CacheState;
  dialog: DialogState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    api: apiReducer,
    app: appReducer,
    attempts: attemptsReducer,
    buffers: buffersReducer,
    cache: cacheReducer,
    dialog: dialogReducer,
    router: connectRouter(history)
  });

export type Actions =
  | ApiActions
  | AppActions
  | AttemptsActions
  | BuffersActions
  | CacheActions
  | DialogActions
  | RouterAction;

const allAction = {
  api: apiActions,
  app: appActions,
  buffers: buffersActions,
  dialog: dialogActions
};

export const connector = <OwnProps extends {}, StateProps extends {}, ActionProps extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => StateProps,
  actionSelector: (actions: typeof allAction) => ActionProps,
  component: ComponentType<StateProps & ActionProps>
) =>
  connect(
    stateSelector,
    actionSelector(allAction)
  )(component as any);
