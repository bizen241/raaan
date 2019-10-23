import { EntityObject, EntityType } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { SearchResponse } from "../../../shared/api/response/search";
import { stringifyParams } from "../request/search";

export type IdMap = {
  [index: string]: string | undefined;
};

interface SearchResult {
  ids: IdMap;
  count: number;
  fetchedAt: number;
}

export interface SearchResultMap {
  [query: string]: SearchResult | undefined;
}

export type SearchResultStore = { [P in EntityType]: SearchResultMap };

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
  params: Params<E>,
  response: SearchResponse
): SearchResultStore => {
  const searchQueryString = stringifyParams(params, true);
  const searchResultMap = store[entityType];

  const target = searchResultMap[searchQueryString] || {
    ids: {},
    count: 0,
    fetchedAt: Date.now()
  };

  const { searchOffset = 0 } = params;

  return {
    ...store,
    [entityType]: {
      ...searchResultMap,
      [searchQueryString]: {
        ids: mergeIds(target, response, searchOffset),
        count: response.count,
        fetchedAt: Date.now()
      }
    }
  };
};
