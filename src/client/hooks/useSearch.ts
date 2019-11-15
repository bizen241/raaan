import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { defaultSearchLimit, defaultSearchOffset, Params } from "../../shared/api/request/params";
import { stringifyParams } from "../api/request/search";
import { actions, RootState } from "../reducers";

export const useSearch = <E extends EntityObject>(entityType: EntityType, initialParams: Params<E>) => {
  const dispatch = useDispatch();

  const [params, setParams] = useState<Params<E>>(initialParams);
  const { searchLimit = defaultSearchLimit, searchOffset = defaultSearchOffset } = params;

  const { statusMap, resultMap, entityMap } = useSelector((state: RootState) => ({
    statusMap: state.api.search[entityType],
    resultMap: state.cache.search[entityType],
    entityMap: state.cache.get[entityType]
  }));

  const status = statusMap[stringifyParams(params)];
  const result = resultMap[stringifyParams(params, true)];

  const selectedEntities = useMemo(() => {
    if (result === undefined) {
      return undefined;
    }

    const entities: E[] = [];
    const entityIds = result.ids;
    const entityCount = Math.min(searchOffset + searchLimit, result.count);

    for (let index = searchOffset; index < entityCount; index++) {
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
  }, [params, result, entityMap]);

  useEffect(() => {
    if (result === undefined || selectedEntities === undefined) {
      dispatch(actions.api.search(entityType, params));
    }
  }, [params]);

  return {
    limit: searchLimit,
    offset: searchOffset,
    count: result !== undefined ? result.count : 0,
    entities: selectedEntities || [],
    params,
    status: status !== undefined ? status.code : selectedEntities !== undefined ? 200 : 102,
    onReload: useCallback(() => dispatch(actions.api.search(entityType, params)), [params]),
    onChange: useCallback((changedParams: Params<E>) => setParams(s => ({ ...s, ...changedParams })), [])
  };
};
