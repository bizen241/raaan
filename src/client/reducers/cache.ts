import { Reducer } from "redux";
import { Actions } from ".";
import {
  createEntityTypeToObject,
  EntityId,
  EntityType,
  EntityTypeToEntity,
  mergeEntityTypeToObject
} from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { EntityStore } from "../../shared/api/response/get";
import { SearchResponse } from "../../shared/api/response/search";
import {
  appendToSearchResultMap,
  deleteFromSearchResultMap,
  findCreatedEntityId,
  mergeSearchResultStore,
  SearchResultStore
} from "../api/response/search";
import { ActionUnion, createAction } from "./action";
import { guestUser, guestUserAccount, guestUserConfig } from "./guest";

export enum CacheActionType {
  Get = "cache/get",
  Search = "cache/search",
  Add = "cache/add",
  Purge = "cache/purge"
}

export const cacheActions = {
  get: (response: Partial<EntityStore>) =>
    createAction(CacheActionType.Get, {
      response
    }),
  search: <T extends EntityType>(entityType: T, params: Params<EntityTypeToEntity[T]>, response: SearchResponse) =>
    createAction(CacheActionType.Search, {
      entityType,
      params,
      response
    }),
  add: <T extends EntityType>(entityType: T, params: Params<EntityTypeToEntity[T]>, response: EntityStore) =>
    createAction(CacheActionType.Add, {
      entityType,
      params,
      response
    }),
  purge: <T extends EntityType>(entityType: T | undefined, entityId: EntityId<T> | undefined) =>
    createAction(CacheActionType.Purge, {
      entityType,
      entityId
    })
};

export type CacheActions = ActionUnion<typeof cacheActions>;

export type CacheState = {
  get: EntityStore;
  search: SearchResultStore;
};

export const getEntity = <T extends EntityType>(entityMap: EntityStore[T], entityId: EntityId<T>) =>
  entityMap[entityId] as EntityTypeToEntity[T] | undefined;

export const initialCacheState: CacheState = {
  get: {
    ...createEntityTypeToObject(),
    User: {
      [guestUser.id]: guestUser
    },
    UserAccount: {
      [guestUserAccount.id]: guestUserAccount
    },
    UserConfig: {
      [guestUserConfig.id]: guestUserConfig
    }
  },
  search: createEntityTypeToObject()
};

export const cacheReducer: Reducer<CacheState, Actions> = (state = initialCacheState, action) => {
  switch (action.type) {
    case CacheActionType.Get: {
      const { response } = action.payload;

      return {
        ...state,
        get: mergeEntityTypeToObject(state.get, response)
      };
    }
    case CacheActionType.Search: {
      const { entityType, params, response } = action.payload;

      return {
        get: mergeEntityTypeToObject(state.get, response.entities),
        search: mergeSearchResultStore(state.search, entityType, params, response)
      };
    }
    case CacheActionType.Add: {
      const { entityType, params, response } = action.payload;

      const targetId = findCreatedEntityId(entityType, response);
      if (targetId === undefined) {
        return state;
      }

      const result = appendToSearchResultMap(state.search[entityType], params, targetId);

      return {
        ...state,
        search: {
          ...state.search,
          [entityType]: result
        }
      };
    }
    case CacheActionType.Purge: {
      const { entityType, entityId } = action.payload;

      if (entityType === undefined) {
        return initialCacheState;
      }
      if (entityId === undefined) {
        return {
          get: {
            ...state.get,
            [entityType]: initialCacheState.get[entityType]
          },
          search: {
            ...state.search,
            [entityType]: initialCacheState.search[entityType]
          }
        };
      }

      const get = { ...state.get[entityType] };
      delete get[entityId];

      const result = deleteFromSearchResultMap(state.search[entityType], entityId);

      return {
        get: {
          ...state.get,
          [entityType]: get
        },
        search: {
          ...state.search,
          [entityType]: result
        }
      };
    }
    default:
      return state;
  }
};
