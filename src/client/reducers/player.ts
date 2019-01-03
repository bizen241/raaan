import { Reducer } from "redux";
import { Actions } from ".";
import { ContentData } from "../../shared/content";
import { ActionUnion, createAction } from "../actions/helpers";
import { createContentData, createPlan } from "../domain/content";
import { compileContent, CompiledItem } from "../domain/content/compiler";

export enum PlayerActionType {
  Load = "player/load",
  Start = "player/start",
  Next = "player/next"
}

interface Result {
  id: string;
  time: number;
  accuracy: number;
}

export const playerActions = {
  load: (data: ContentData) => createAction(PlayerActionType.Load, { data }),
  start: () => createAction(PlayerActionType.Start),
  next: (result: Result) => createAction(PlayerActionType.Next, { result })
};

export type PlayerActions = ActionUnion<typeof playerActions>;

export interface PlayerState {
  data: ContentData;
  compiled: CompiledItem[];
  plan: number[];
  cursor: number;
  results: Result[];
  isStarted: boolean;
  isFinished: boolean;
}

export const initialPlayerState: PlayerState = {
  data: createContentData(),
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
      const { data } = action.payload;

      return {
        data,
        compiled: compileContent(data),
        plan: createPlan(data),
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
      return {
        ...state,
        cusror: state.cursor + 1,
        results: [...state.results, action.payload.result],
        isFinished: state.data.items.length - 1 === state.cursor
      };
    }
    default:
      return state;
  }
};
