import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { exerciseActions } from "../actions/exercise";
import { ApiActions, apiActions, apiReducer, ApiState } from "./api";
import { AppActions, appActions, appReducer, AppState } from "./app";
import { BuffersActions, buffersActions, buffersReducer, BuffersState } from "./buffers";
import { CacheActions, cacheReducer, CacheState } from "./cache";

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
