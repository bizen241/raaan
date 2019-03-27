import { Reducer } from "redux";
import { Actions, RootState } from ".";
import { createEntityTypeToEmptyObject, EntityObject, EntityType, EntityTypeToObject } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { apiActions } from "./api";

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

const buffersSyncActions = {
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

export type BuffersActions = ActionUnion<typeof buffersSyncActions>;

export const generateBufferId = () => Date.now().toString();

const load = (entityType: EntityType, entityId: string): AsyncAction => async (dispatch, getState) => {
  const isCached = getState().cache.get[entityType][entityId] !== undefined;

  if (!isCached) {
    await apiActions.get(entityType, entityId)(dispatch, getState, undefined);
  }

  const entity = getState().cache.get[entityType][entityId];
  if (entity === undefined) {
    return;
  }

  const { id, createdAt, updatedAt, fetchedAt, ...params } = entity;

  dispatch(buffersActions.add(entityType, entityId, params));
};

export const buffersActions = {
  ...buffersSyncActions,
  load
};

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
            edited: buffer.source
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

  const params = {
    ...buffer.edited,
    ...callback(buffer.edited as SaveParams<E>, getState)
  };

  dispatch(buffersActions.edit(type, id, params));
};
