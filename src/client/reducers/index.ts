import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { AppActions, appReducer, AppState } from "./app";
import { CacheActions, cacheReducer, CacheState } from "./cache";
import { EditorActions, editorReducer, EditorState } from "./editor";
import { PlayerActions, playerReducer, PlayerState } from "./player";

export interface RootState {
  app: AppState;
  cache: CacheState;
  editor: EditorState;
  player: PlayerState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    app: appReducer,
    cache: cacheReducer,
    editor: editorReducer,
    player: playerReducer,
    router: connectRouter(history)
  });

export type Actions = AppActions | CacheActions | EditorActions | PlayerActions | RouterAction;

export const connector = <OwnProps extends {}, SelectedState extends {}, SelectedActions extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => SelectedState,
  actionSelector: () => SelectedActions,
  component: ComponentType<SelectedState & SelectedActions>
) =>
  connect(
    stateSelector,
    actionSelector()
  )(React.memo(component) as any);
