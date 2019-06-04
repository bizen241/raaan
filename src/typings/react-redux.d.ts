import { Action, AnyAction, Dispatch } from "redux";

declare module "react-redux" {
  export function useSelector<TState, TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;

  export function useDispatch<TDispatch = Dispatch<any>>(): TDispatch;
  export function useDispatch<A extends Action = AnyAction>(): Dispatch<A>;
}
