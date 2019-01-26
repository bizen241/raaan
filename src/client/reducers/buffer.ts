import { Reducer } from "redux";
import { Actions } from ".";
import { ContentData } from "../../shared/content";
import { ActionUnion, createAction } from "../actions/helpers";

export interface EditorBuffer {
  parentId: string | null;
  sourceComment: string;
  editedComment: string;
  sourceData: ContentData;
  editedData: ContentData;
}

export enum BufferActionType {
  Update = "buffer/update",
  Delete = "buffer/delete"
}

export const bufferActions = {
  update: (id: string, buffer: EditorBuffer) => createAction(BufferActionType.Update, { id, buffer }),
  delete: (id: string) => createAction(BufferActionType.Delete, { id })
};

export type BufferActions = ActionUnion<typeof bufferActions>;

export interface BufferState {
  [id: string]: EditorBuffer | undefined;
}

export const initialBufferState: BufferState = {};

export const bufferReducer: Reducer<BufferState, Actions> = (state = initialBufferState, action) => {
  switch (action.type) {
    case BufferActionType.Update: {
      return {
        ...state,
        [action.payload.id]: action.payload.buffer
      };
    }
    case BufferActionType.Delete: {
      const { [action.payload.id]: deleted, ...buffers } = state;

      return buffers;
    }
    default:
      return state;
  }
};
