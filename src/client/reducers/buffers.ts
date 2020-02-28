import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToObject, EntityId, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { ActionUnion, createAction } from "./action";
import { guestUserConfig } from "./guest";

export enum BuffersActionType {
  Update = "buffers/update",
  Delete = "buffers/delete"
}

export const buffersActions = {
  update: <T extends EntityType>(entityType: T, entityId: EntityId<T>, params: Params<EntityTypeToEntity[T]>) =>
    createAction(BuffersActionType.Update, {
      entityType,
      entityId,
      params
    }),
  delete: <T extends EntityType>(entityType: T, entityId: EntityId<T>) =>
    createAction(BuffersActionType.Delete, {
      entityType,
      entityId
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
      const { entityType, entityId, params } = action.payload;
      const buffer = state[entityType][entityId] || {
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      return {
        ...state,
        [entityType]: {
          ...state[entityType],
          [entityId]: {
            ...buffer,
            ...params
          }
        }
      };
    }
    case BuffersActionType.Delete: {
      const { entityType, entityId } = action.payload;
      const { [entityId]: deleted, ...buffers } = state[entityType];

      return {
        ...state,
        [entityType]: buffers
      };
    }
    default:
      return state;
  }
};
