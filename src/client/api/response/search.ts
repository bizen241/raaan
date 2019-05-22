import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { SearchResponse } from "../../../shared/api/response/search";
import { stringifySearchParams } from "../request/search";

type IdMap = {
  [index: string]: string | undefined;
};

export interface SearchResult {
  ids: IdMap;
  count: number;
  fetchedAt: number;
}

export interface SearchResultMap {
  [query: string]: SearchResult | undefined;
}

export type SearchResultStore = { [P in EntityType]: SearchResultMap };

export const createSearchResultStore = (): SearchResultStore => ({
  Exercise: {},
  ExerciseSummary: {},
  ExerciseTag: {},
  User: {},
  UserAccount: {},
  UserConfig: {},
  UserSession: {}
});

const hasDiff = (oldIds: IdMap, newIds: IdMap) => {
  const hasDiffInRange = Object.entries(newIds).some(([index, newId]) => {
    return oldIds[index] !== undefined && oldIds[index] !== newId;
  });

  if (hasDiffInRange) {
    return hasDiffInRange;
  }

  const swappedOldIds: { [id: string]: string | undefined } = {};
  Object.entries(oldIds).forEach(([index, oldId]) => {
    if (oldId !== undefined) {
      swappedOldIds[oldId] = index;
    }
  });

  const hasDiffOutOfRange = Object.entries(newIds).some(([index, newId]) => {
    return newId !== undefined && swappedOldIds[newId] !== undefined && swappedOldIds[newId] !== index;
  });

  return hasDiffOutOfRange;
};

const mergeIds = (target: SearchResult, response: SearchResponse, offset: number) => {
  const oldIds = target.ids;

  const newIds: IdMap = {};
  response.ids.forEach((id, index) => {
    newIds[offset + index] = id;
  });

  if (target.count !== response.count || hasDiff(oldIds, newIds)) {
    return newIds;
  }

  return {
    ...oldIds,
    ...newIds
  };
};

export const mergeSearchResultStore = <E extends EntityObject>(
  store: SearchResultStore,
  entityType: EntityType,
  params: SearchParams<E>,
  response: SearchResponse
): SearchResultStore => {
  const searchQueryString = stringifySearchParams(params, true);
  const searchResultMap = store[entityType];

  const target = searchResultMap[searchQueryString] || {
    ids: {},
    count: 0,
    fetchedAt: Date.now()
  };

  return {
    ...store,
    [entityType]: {
      ...searchResultMap,
      [searchQueryString]: {
        ids: mergeIds(target, response, params.offset),
        count: response.count,
        fetchedAt: Date.now()
      }
    }
  };
};
