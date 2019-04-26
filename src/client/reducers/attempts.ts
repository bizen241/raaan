import { Reducer } from "redux";
import { Actions } from ".";
import { ExerciseDetail } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, createAction } from "../actions";
import { createPlan } from "../domain/content";

export enum AttemptsActionType {
  Load = "attempts/load",
  Next = "attempts/next"
}

export interface TypoMap {
  [key: string]: number | undefined;
}

export interface QuestionResult {
  totalTime: number;
  typoMap: TypoMap;
  typedLines: string[];
}

export const attemptsActions = {
  load: (id: string, params: SaveParams<ExerciseDetail>) => createAction(AttemptsActionType.Load, { id, params }),
  next: (result: QuestionResult) => createAction(AttemptsActionType.Next, { result })
};

export type AttemptsActions = ActionUnion<typeof attemptsActions>;

export interface AttemptState {
  id: string;
  params?: SaveParams<ExerciseDetail>;
  plan: number[];
  results: QuestionResult[];
  isRubricOpen: boolean;
  isDescriptionOpen: boolean;
}

export const initialAttemptsState: AttemptState = {
  id: Date.now().toString(),
  plan: [],
  results: [],
  isRubricOpen: true,
  isDescriptionOpen: false
};

export const attemptsReducer: Reducer<AttemptState, Actions> = (state = initialAttemptsState, action) => {
  switch (action.type) {
    case AttemptsActionType.Load: {
      const { id, params } = action.payload;

      return {
        id,
        params,
        plan: createPlan(params.questions || []),
        results: [],
        isRubricOpen: params.rubric ? true : false,
        isDescriptionOpen: false
      };
    }
    case AttemptsActionType.Next: {
      const { result } = action.payload;

      return {
        ...state,
        results: [...state.results, result]
      };
    }
    default:
      return state;
  }
};
