import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { ActionUnion, createAction } from "./action";
import { guestUserConfig } from "./cache";

export enum BuffersActionType {
  Update = "buffers/update",
  Delete = "buffers/delete"
}

export const buffersActions = {
  update: <T extends EntityType>(type: T, id: string, params: Params<EntityTypeToEntity[T]>) =>
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
export const isNumber = (id: string) => !isNaN(Number(id));

export type BuffersState = {
  [P in keyof EntityTypeToEntity]: {
    [id: string]: Params<EntityTypeToEntity[P]> | undefined;
  };
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
