import { connectRouter, RouterAction, RouterState } from "connected-react-router";
import { History } from "history";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
import { AppActions, appReducer, AppState } from "./app";
import { BufferActions, bufferReducer, BufferState } from "./buffer";
import { CacheActions, cacheReducer, CacheState } from "./cache";
import { EditorActions, editorReducer, EditorState } from "./editor";
import { PlayerActions, playerReducer, PlayerState } from "./player";

export interface RootState {
  app: AppState;
  buffer: BufferState;
  cache: CacheState;
  editor: EditorState;
  player: PlayerState;
  router: RouterState;
}

export const createReducer = (history: History) =>
  combineReducers({
    app: appReducer,
    buffer: bufferReducer,
    cache: cacheReducer,
    editor: editorReducer,
    player: playerReducer,
    router: connectRouter(history)
  });

export type Actions = AppActions | BufferActions | CacheActions | EditorActions | PlayerActions | RouterAction;

export const connector = <OwnProps extends {}, SelectedState extends {}, SelectedActions extends {}>(
  stateSelector: (state: RootState, ownProps: OwnProps) => SelectedState,
  actionSelector: () => SelectedActions,
  component: ComponentType<SelectedState & SelectedActions>
) =>
  connect(
    stateSelector,
    actionSelector()
  )(component as any);
