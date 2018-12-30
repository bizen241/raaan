import { Reducer } from "redux";
import { Actions } from ".";
import { ContentData } from "../../shared/content";
import { ActionUnion, createAction } from "../actions/helpers";

export enum BufferActionType {
  Update = "buffer/update",
  Delete = "buffer/delete"
}

export const bufferActions = {
  update: (id: string, data: ContentData) => createAction(BufferActionType.Update, { id, data }),
  delete: (id: string) => createAction(BufferActionType.Delete, { id })
};

export type BufferActions = ActionUnion<typeof bufferActions>;

export interface BufferState {
  [id: string]: ContentData | undefined;
}

export const initialBufferState: BufferState = {};

export const bufferReducer: Reducer<BufferState, Actions> = (state = initialBufferState, action) => {
  switch (action.type) {
    case BufferActionType.Update: {
      return {
        ...state,
        [action.payload.id]: action.payload.data
      };
    }
    case BufferActionType.Delete: {
      const buffer = { ...state };
      delete buffer[action.payload.id];

      return buffer;
    }
    default:
      return state;
  }
};
