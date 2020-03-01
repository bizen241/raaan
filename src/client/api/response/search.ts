import { EntityId, EntityType, EntityTypeToEntity } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { EntityStore } from "../../../shared/api/response/get";
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

export const mergeSearchResultStore = <T extends EntityType>(
  store: SearchResultStore,
  entityType: T,
  params: Params<EntityTypeToEntity[T]>,
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

export const findCreatedEntityId = <T extends EntityType>(entityType: T, response: EntityStore) => {
  let createdAt = 0;
  let targetId: EntityId<T> | undefined;

  Object.values(response[entityType]).forEach((entity: EntityTypeToEntity[T]) => {
    if (entity.createdAt > createdAt) {
      createdAt = entity.createdAt;
      targetId = entity.id as EntityId<T>;
    }
  });

  return targetId;
};

export const appendToSearchResultMap = <T extends EntityType>(
  source: SearchResultMap,
  params: Params<EntityTypeToEntity[T]>,
  targetId: EntityId<T>
): SearchResultMap => {
  const query = stringifyParams(params, true);
  const result = source[query] || {
    ids: {},
    count: 0,
    fetchedAt: Date.now()
  };

  const ids: IdMap = {
    [0]: targetId
  };

  Object.entries(result.ids).forEach(([indexString, entityId]) => {
    const index = Number(indexString);
    ids[index + 1] = entityId;
  });

  return {
    ...source,
    [query]: {
      ...result,
      ids,
      count: result.count + 1
    }
  };
};

export const deleteFromSearchResultMap = <T extends EntityType>(
  source: SearchResultMap,
  targetId: EntityId<T>
): SearchResultMap => {
  const updated: SearchResultMap = {};

  Object.entries(source).forEach(([query, result]) => {
    if (result === undefined) {
      return;
    }

    const targetIndex = Object.values(result.ids).indexOf(targetId);
    if (targetIndex === -1) {
      return;
    }

    const ids: IdMap = {};
    Object.entries(result.ids).forEach(([indexString, entityId]) => {
      if (entityId === targetId) {
        return;
      }

      const index = Number(indexString);
      if (index > targetIndex) {
        ids[index - 1] = entityId;
      } else {
        ids[index] = entityId;
      }
    });

    updated[query] = {
      ...result,
      ids,
      count: result.count - 1
    };
  });

  return {
    ...source,
    ...updated
  };
};
