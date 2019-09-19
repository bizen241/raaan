import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToObject, EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { guestUserConfig } from "../components/project/Context";
import { ActionUnion, createAction } from "./action";

export enum BuffersActionType {
  Add = "buffers/add",
  Update = "buffers/update",
  Delete = "buffers/delete"
}

export const buffersActions = {
  add: <E extends EntityObject>(type: EntityType, id: string, params?: SaveParams<E>) =>
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
  delete: (type: EntityType, id: string) =>
    createAction(BuffersActionType.Delete, {
      type,
      id
    })
};

export type BuffersActions = ActionUnion<typeof buffersActions>;

export const generateBufferId = () => Date.now().toString();

export type BuffersState = {
  [P in keyof EntityTypeToEntity]: {
    [id: string]: SaveParams<EntityTypeToEntity[P]> | undefined;
  }
};

export const initialBuffersState: BuffersState = {
  ...createEntityTypeToObject<BuffersState>(),
  UserConfig: {
    [guestUserConfig.id]: {
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  }
};

export const buffersReducer: Reducer<BuffersState, Actions> = (state = initialBuffersState, action) => {
  switch (action.type) {
    case BuffersActionType.Add: {
      const { type, id, params = {} } = action.payload;

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...params,
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        }
      };
    }
    case BuffersActionType.Update: {
      const { type, id, params } = action.payload;
      const buffer = state[type][id] || {
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      return {
        ...state,
        [type]: {
          ...state[type],
          [id]: {
            ...buffer,
            ...params
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
