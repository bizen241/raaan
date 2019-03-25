import { Reducer } from "redux";
import { Actions } from ".";
import { ExerciseDetail } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, createAction } from "../actions";
import { createExerciseDetail, createPlan } from "../domain/content";
import { CompiledItem, compileExercise } from "../domain/content/compiler";

export enum PlayerActionType {
  Load = "player/load",
  Start = "player/start",
  Next = "player/next",
  Finish = "player/finish"
}

export interface TypoMap {
  [key: string]: number | undefined;
}

export interface QuestionResult {
  id: string;
  time: number;
  typeCount: number;
  typoMap: TypoMap;
}

export const playerActions = {
  load: (content: SaveParams<ExerciseDetail>) => createAction(PlayerActionType.Load, { content }),
  start: () => createAction(PlayerActionType.Start),
  next: (result: QuestionResult) => createAction(PlayerActionType.Next, { result }),
  finish: () => createAction(PlayerActionType.Finish)
};

export type PlayerActions = ActionUnion<typeof playerActions>;

export interface PlayerState {
  content: SaveParams<ExerciseDetail>;
  compiled: CompiledItem[];
  plan: number[];
  cursor: number;
  results: QuestionResult[];
  isStarted: boolean;
  isFinished: boolean;
}

export const initialPlayerState: PlayerState = {
  content: createExerciseDetail(),
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
        compiled: compileExercise(content),
        plan: createPlan(content.questions || []),
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
      const questions = state.content.questions || [];

      return {
        ...state,
        cursor: state.cursor + 1,
        results: [...state.results, action.payload.result],
        isFinished: questions.length - 1 === state.cursor
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
