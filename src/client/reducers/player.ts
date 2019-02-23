import { Reducer } from "redux";
import { Actions } from ".";
import { ContentRevision } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, createAction } from "../actions/helpers";
import { createContentRevision, createPlan } from "../domain/content";
import { compileContent, CompiledItem } from "../domain/content/compiler";

export enum PlayerActionType {
  Load = "player/load",
  Start = "player/start",
  Next = "player/next",
  Finish = "player/finish"
}

export interface TypoMap {
  [key: string]: number | undefined;
}

export interface ContentItemResult {
  id: string;
  time: number;
  typeCount: number;
  typoMap: TypoMap;
}

export const playerActions = {
  load: (content: SaveParams<ContentRevision>) => createAction(PlayerActionType.Load, { content }),
  start: () => createAction(PlayerActionType.Start),
  next: (result: ContentItemResult) => createAction(PlayerActionType.Next, { result }),
  finish: () => createAction(PlayerActionType.Finish)
};

export type PlayerActions = ActionUnion<typeof playerActions>;

export interface PlayerState {
  content: SaveParams<ContentRevision>;
  compiled: CompiledItem[];
  plan: number[];
  cursor: number;
  results: ContentItemResult[];
  isStarted: boolean;
  isFinished: boolean;
}

export const initialPlayerState: PlayerState = {
  content: createContentRevision(),
  compiled: [],
  plan: [],
  cursor: 0,
  results: [],
  isStarted: false,
  isFinished: false
};

export const playerReducer: Reducer<PlayerState, Actions> = (state = initialPlayerState, action) => {
  switch (action.type) {
    case PlayerActionType.Load: {
      const { content } = action.payload;

      return {
        content,
        compiled: compileContent(content),
        plan: createPlan(content.items || []),
        cursor: 0,
        results: [],
        isStarted: false,
        isFinished: false
      };
    }
    case PlayerActionType.Start: {
      return {
        ...state,
        isStarted: true
      };
    }
    case PlayerActionType.Next: {
      const items = state.content.items || [];

      return {
        ...state,
        cursor: state.cursor + 1,
        results: [...state.results, action.payload.result],
        isFinished: items.length - 1 === state.cursor
      };
    }
    case PlayerActionType.Finish: {
      return {
        ...state,
        isFinished: true
      };
    }
    default:
      return state;
  }
};
