import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToEmptyObject, EntityObject, EntityType, EntityTypeToObject } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { apiActions } from "./api";

export enum BuffersActionType {
  Add = "buffers/add",
  Update = "buffers/update",
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
  update: <E extends EntityObject>(type: EntityType, id: string, params: SaveParams<E>) =>
    createAction(BuffersActionType.Update, {
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
    case BuffersActionType.Update: {
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
            edited: {
              ...buffer.edited,
              ...params
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
