import { Reducer } from "redux";
import { ActionUnion, createAction } from "../actions";

export enum DialogActionType {
  Open = "dialog/open",
  Close = "dialog/close"
}

type DialogName = "ExercisePreviewer" | "ExerciseItemPreviewer";

export const dialogActions = {
  open: (name: DialogName) => createAction(DialogActionType.Open, { name }),
  close: () => createAction(DialogActionType.Close)
};

export type DialogActions = ActionUnion<typeof dialogActions>;

export interface DialogState {
  name: DialogName | null;
}

const initialDialogState: DialogState = {
  name: null
};

export const dialogReducer: Reducer<DialogState, DialogActions> = (state = initialDialogState, action) => {
  switch (action.type) {
    case DialogActionType.Open: {
      return {
        name: action.payload.name
      };
    }
    case DialogActionType.Close: {
      return {
        name: null
      };
    }
    default: {
      return state;
    }
  }
};
