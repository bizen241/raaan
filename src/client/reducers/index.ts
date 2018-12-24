import { ComponentType } from "react";
import { connect } from "react-redux";
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

export const connector = <OwnProps extends {}, SelectedState extends {}, SelectedActions extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => SelectedState,
  actionSelector: () => SelectedActions,
  component: ComponentType<SelectedState & SelectedActions>
) =>
  connect(
    stateSelector,
    actionSelector()
  )(component as any);
