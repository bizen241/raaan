import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers, Dispatch as ReduxDispatch } from "redux";
import { exerciseActions } from "../actions/exercise";
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

export const actions = {
  api: apiActions,
  app: appActions,
  buffers: buffersActions,
  dialog: dialogActions,
  exercise: exerciseActions
};

export const connector = <OwnProps extends {}, StateProps extends {}, ActionProps extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => StateProps,
  actionSelector: (allAction: typeof actions) => ActionProps,
  component: ComponentType<StateProps & ActionProps>
) =>
  connect(
    stateSelector,
    actionSelector(actions)
  )(component as any);
