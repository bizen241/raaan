import { ActionCreatorsMapObject, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".";

interface Action<T extends string, P> {
  type: T;
  payload: P;
  error?: boolean;
}

export function createAction<T extends string>(type: T): Action<T, undefined>;
export function createAction<T extends string, P>(type: T, payload: P): Action<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  const isError = payload instanceof Error;

  return { type, payload, error: isError };
}

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;

export type AsyncAction = ThunkAction<void, RootState, undefined, AnyAction>;
