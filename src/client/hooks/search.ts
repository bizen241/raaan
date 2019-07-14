import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { stringifySearchParams } from "../api/request/search";
import { actions, RootState } from "../reducers";

export const useSearch = <E extends EntityObject>(
  entityType: EntityType,
  initialSearchParams: Partial<SearchParams<E>>
) => {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const offset = limit * page;

  const [searchParams, setSearchParams] = useState({
    ...initialSearchParams,
    limit,
    offset
  });

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
    const lastIndex = Math.min(offset + limit, searchResult.count - 1);

    for (let index = offset; index <= lastIndex; index++) {
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
  }, [searchResult, entityMap]);

  useEffect(() => {
    if (searchResult === undefined || selectedEntities === undefined) {
      dispatch(actions.api.search(entityType, searchParams));
    }
  }, [searchParams]);

  return {
    limit,
    page,
    count: searchResult !== undefined ? searchResult.count : 0,
    entities: selectedEntities || [],
    params: searchParams,
    status: searchStatus,
    onReload: useCallback(() => dispatch(actions.api.search(entityType, searchParams)), [searchParams]),
    onChangeParams: useCallback((params: Partial<SearchParams<E>>) => setSearchParams(s => ({ ...s, ...params })), []),
    onChangePage: useCallback((_, nextPage: number) => setPage(nextPage), []),
    onChangeRowsPerPage: useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => setLimit(parseInt(e.target.value, 10)),
      []
    )
  };
};
