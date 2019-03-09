import { Reducer } from "redux";
import { EntityType } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { createEntityStore, EntityStore } from "../../shared/api/response/get";
import { SearchResponse } from "../../shared/api/response/search";
import { ActionUnion, createAction } from "../actions";
import { mergeEntityStore } from "../api/response/entity";
import { createSearchResultStore, mergeSearchResultStore, SearchResultStore } from "../api/response/search";

export enum CacheActionType {
  Get = "cache/get",
  Search = "cache/search",
  Purge = "cache/purge"
}

export const cacheActions = {
  get: (result: EntityStore) =>
    createAction(CacheActionType.Get, {
      result
    }),
  search: (type: EntityType, params: SearchParams<any>, result: SearchResponse) =>
    createAction(CacheActionType.Search, {
      type,
      params,
      result
    }),
  purge: (type: EntityType, id: string) =>
    createAction(CacheActionType.Purge, {
      type,
      id
    })
};

export type CacheActions = ActionUnion<typeof cacheActions>;

export type CacheState = {
  get: EntityStore;
  search: SearchResultStore;
};

export const initialCacheState: CacheState = {
  get: createEntityStore(),
  search: createSearchResultStore()
};

export const cacheReducer: Reducer<CacheState, CacheActions> = (state = initialCacheState, action) => {
  switch (action.type) {
    case CacheActionType.Get: {
      const { result } = action.payload;

      return {
        ...state,
        get: mergeEntityStore(state.get, result)
      };
    }
    case CacheActionType.Search: {
      const { type, params, result } = action.payload;

      return {
        get: mergeEntityStore(state.get, result.entities),
        search: mergeSearchResultStore(state.search, type, params, result)
      };
    }
    case CacheActionType.Purge: {
      const { type, id } = action.payload;
      const { [id]: deleted, ...cache } = state.get[type];

      return {
        ...state,
        get: {
          ...state.get,
          [type]: cache
        }
      };
    }
    default:
      return state;
  }
};
