import { Reducer } from "redux";
import { Actions, RootState } from ".";
import { createEntityTypeToEmptyObject, EntityObject, EntityType, EntityTypeToObject } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { createContentRevision } from "../domain/content";

export enum BuffersActionType {
  Add = "buffers/add",
  Edit = "buffers/edit",
  Reset = "buffers/reset",
  Delete = "buffers/delete"
}

export type Buffer<E extends EntityObject> = {
  source: SaveParams<E>;
  edited: SaveParams<E>;
  createdAt: number;
  updatedAt: number;
};

export const buffersActions = {
  add: <E extends EntityObject>(type: EntityType, id: string, params: SaveParams<E>) =>
    createAction(BuffersActionType.Add, {
      type,
      id,
      params
    }),
  edit: <E extends EntityObject>(type: EntityType, id: string, params: SaveParams<E>) =>
    createAction(BuffersActionType.Edit, {
      type,
      id,
      params
    }),
  reset: (type: EntityType, id: string) =>
    createAction(BuffersActionType.Reset, {
      type,
      id
    }),
  delete: (type: EntityType, id: string) =>
    createAction(BuffersActionType.Delete, {
      type,
      id
    })
};

export type BuffersActions = ActionUnion<typeof buffersActions>;

export type BuffersState = {
  [P in keyof EntityTypeToObject]: {
    [id: string]: Buffer<EntityTypeToObject[P]> | undefined;
  }
};

export const initialBuffersState = createEntityTypeToEmptyObject<BuffersState>();

export const buffersReducer: Reducer<BuffersState, Actions> = (state = initialBuffersState, action) => {
  switch (action.type) {
    case BuffersActionType.Add: {
      const { type, id, params } = action.payload;

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            source: params,
            edited: params
          }
        }
      };
    }
    case BuffersActionType.Edit: {
      const { type, id, params } = action.payload;
      const buffer = state[type][id];
      if (buffer === undefined) {
        return state;
      }

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...buffer,
            edited: params
          }
        }
      };
    }
    case BuffersActionType.Reset: {
      const { type, id } = action.payload;
      const buffer = state[type][id];
      if (buffer === undefined) {
        return state;
      }

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...buffer,
            edited: buffer.source || createContentRevision(id)
          }
        }
      };
    }
    case BuffersActionType.Delete: {
      const { type, id } = action.payload;
      const { [id]: deleted, ...buffers } = state[type];

      return {
        ...state,
        [type]: buffers
      };
    }
    default:
      return state;
  }
};

export const editBuffer = <E extends EntityObject>(
  type: EntityType,
  id: string,
  callback: (revision: SaveParams<E>, getState: () => RootState) => SaveParams<E>
): AsyncAction => (dispatch, getState) => {
  const state = getState().buffers;
  const buffer = state[type][id];
  if (buffer === undefined) {
    return;
  }

  dispatch(buffersActions.edit(type, id, callback(buffer.edited as SaveParams<E>, getState)));
};
