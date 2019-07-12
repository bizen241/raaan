import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToEmptyObject, EntityObject, EntityType, EntityTypeToObject } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { apiActions } from "./api";

export enum BuffersActionType {
  Add = "buffers/add",
  UpdateValue = "buffers/update-value",
  AppendArrayItem = "buffers/append-array-item",
  UpdateArrayItem = "buffers/update-array-item",
  DeleteArrayItem = "buffers/delete-array-item",
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
  updateValue: <E extends EntityObject>(type: EntityType, id: string, key: keyof E, value: any) =>
    createAction(BuffersActionType.UpdateValue, {
      type,
      id,
      key,
      value
    }),
  appendArrayItem: <E extends EntityObject>(type: EntityType, id: string, key: keyof E, item: any) =>
    createAction(BuffersActionType.AppendArrayItem, {
      type,
      id,
      key,
      item
    }),
  updateArrayItem: <E extends EntityObject>(type: EntityType, id: string, key: keyof E, index: number, item: any) =>
    createAction(BuffersActionType.UpdateArrayItem, {
      type,
      id,
      key,
      index,
      item
    }),
  deleteArrayItem: <E extends EntityObject>(type: EntityType, id: string, key: keyof E, index: number) =>
    createAction(BuffersActionType.DeleteArrayItem, {
      type,
      id,
      key,
      index
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
    case BuffersActionType.UpdateValue: {
      const { type, id, key, value } = action.payload;
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
            edited: {
              ...buffer.edited,
              [key]: value
            }
          }
        }
      };
    }
    case BuffersActionType.AppendArrayItem: {
      const { type, id, key, item } = action.payload;
      const buffer = state[type][id];
      if (buffer === undefined) {
        return state;
      }

      const params = buffer.edited as any;

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...buffer,
            edited: {
              ...buffer.edited,
              [key]: [...params[key], item]
            }
          }
        }
      };
    }
    case BuffersActionType.UpdateArrayItem: {
      const { type, id, key, index, item } = action.payload;
      const buffer = state[type][id];
      if (buffer === undefined) {
        return state;
      }

      const params = buffer.edited as any;
      const array: any[] = params[key] || [];

      const updatedItem =
        typeof item === "object"
          ? {
              ...array[index],
              ...item
            }
          : item;

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...buffer,
            edited: {
              ...params,
              [key]: [...array.slice(0, index), updatedItem, ...array.slice(index + 1)]
            }
          }
        }
      };
    }
    case BuffersActionType.DeleteArrayItem: {
      const { type, id, key, index } = action.payload;
      const buffer = state[type][id];
      if (buffer === undefined) {
        return state;
      }

      const params = buffer.edited as any;
      const array: any[] = params[key] || [];

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...buffer,
            edited: {
              ...params,
              [key]: [...array.slice(0, index), ...array.slice(index + 1)]
            }
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
