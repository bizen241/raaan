import { Reducer } from "redux";
import { Actions } from ".";
import { ContentRevision } from "../../shared/api/entities";
import { ActionUnion, createAction } from "../actions/helpers";
import { ContentRevisionParams } from "../domain/content";

export interface EditorBuffer {
  sourceRevision: ContentRevision | null;
  editedRevision: ContentRevisionParams;
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
