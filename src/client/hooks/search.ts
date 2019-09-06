import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { stringifySearchParams } from "../api/request/search";
import { actions, RootState } from "../reducers";

export const useSearch = <E extends EntityObject>(entityType: EntityType, initialSearchParams: SearchParams<E>) => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useState<SearchParams<E>>({
    limit: 10,
    offset: 0,
    ...initialSearchParams
  });
  const { limit = 10, offset = 0 } = searchParams;

  const { searchStatusMap, searchResultMap, entityMap } = useSelector((state: RootState) => ({
    searchStatusMap: state.api.search[entityType],
    searchResultMap: state.cache.search[entityType],
    entityMap: state.cache.get[entityType]
  }));

  const searchStatus = searchStatusMap[stringifySearchParams(searchParams)];
  const searchResult = searchResultMap[stringifySearchParams(searchParams, true)];

  const selectedEntities = useMemo(() => {
    if (searchResult === undefined) {
      return undefined;
    }

    const entities: Array<E | undefined> = [];
    const entityIds = searchResult.ids;
    const entityCount = Math.min(offset + limit, searchResult.count);

    for (let index = offset; index < entityCount; index++) {
      const entityId = entityIds[index];
      if (entityId === undefined) {
        return undefined;
      }

      const entity = entityMap[entityId];
      if (entity === undefined) {
        return undefined;
      }

      entities.push(entity as E);
    }

    return entities;
  }, [searchParams, searchResult, entityMap]);

  useEffect(() => {
    if (searchResult === undefined || selectedEntities === undefined) {
      dispatch(actions.api.search(entityType, searchParams));
    }
  }, [searchParams]);

  return {
    limit,
    offset,
    count: searchResult !== undefined ? searchResult.count : 0,
    entities: selectedEntities || [],
    params: searchParams,
    status: searchStatus || selectedEntities !== undefined ? 200 : 102,
    onReload: useCallback(() => dispatch(actions.api.search(entityType, searchParams)), [searchParams]),
    onChange: useCallback((params: SearchParams<E>) => setSearchParams(s => ({ ...s, ...params })), [])
  };
};
