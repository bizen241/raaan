import { Reducer } from "redux";
import { EntityType } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { createEntityStore, EntityStore } from "../../shared/api/response/entity";
import { SearchResponse } from "../../shared/api/response/search";
import { ActionUnion, createAction } from "../actions/helpers";
import { mergeEntityStore } from "../api/response/entity";
import { createSearchResultStore, mergeSearchResultStore, SearchResultStore } from "../api/response/search";

export enum CacheActionType {
  MergeGetResult = "cache/merge-get-result",
  MergeSearchResult = "cache/merge-search-result"
}

export const cacheActions = {
  mergeGetResult: (result: EntityStore) => createAction(CacheActionType.MergeGetResult, { result }),
  mergeSearchResult: (entityType: EntityType, params: SearchParams<any>, result: SearchResponse) =>
    createAction(CacheActionType.MergeSearchResult, { entityType, params, result })
};

export type CacheActions = ActionUnion<typeof cacheActions>;

export interface CacheState {
  get: EntityStore;
  search: SearchResultStore;
}

export const initialCacheState: CacheState = {
  get: createEntityStore(),
  search: createSearchResultStore()
};

export const cacheReducer: Reducer<CacheState, CacheActions> = (state = initialCacheState, action) => {
  switch (action.type) {
    case CacheActionType.MergeGetResult: {
      return {
        ...state,
        get: mergeEntityStore(state.get, action.payload.result)
      };
    }
    case CacheActionType.MergeSearchResult: {
      const { entityType, params, result } = action.payload;

      return {
        get: mergeEntityStore(state.get, result.entities),
        search: mergeSearchResultStore(state.search, entityType, params, result)
      };
    }
    default:
      return state;
  }
};
