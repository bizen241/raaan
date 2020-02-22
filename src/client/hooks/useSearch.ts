import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { defaultSearchLimit, defaultSearchOffset, Params } from "../../shared/api/request/params";
import { stringifyParams } from "../api/request/search";
import { actions, RootState } from "../reducers";

export const useSearch = <T extends EntityType>(
  entityType: T,
  initialParams: Params<EntityTypeToEntity[T]>,
  shouldFetch: boolean = true
) => {
  const dispatch = useDispatch();

  const [params, setParams] = useState<Params<EntityTypeToEntity[T]>>(initialParams);
  const { searchLimit = defaultSearchLimit, searchOffset = defaultSearchOffset } = params;

  const statusMap = useSelector((state: RootState) => state.api.search[entityType]);
  const resultMap = useSelector((state: RootState) => state.cache.search[entityType]);
  const entityMap = useSelector((state: RootState) => state.cache.get[entityType]);

  const status = statusMap[stringifyParams(params)];
  const result = resultMap[stringifyParams(params, true)];

  const entities = useMemo(() => {
    if (result === undefined) {
      return undefined;
    }

    const entityArray: EntityTypeToEntity[T][] = [];
    const entityIdMap = result.ids;
    const entityCount = Math.min(searchOffset + searchLimit, result.count);

    for (let index = searchOffset; index < entityCount; index++) {
      const entityId = entityIdMap[index];
      if (entityId === undefined) {
        return undefined;
      }

      const entity = entityMap[entityId];
      if (entity === undefined) {
        return undefined;
      }

      entityArray.push(entity as EntityTypeToEntity[T]);
    }

    return entityArray;
  }, [params, result, entityMap]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    if (entities === undefined) {
      dispatch(actions.api.search(entityType, params));
    }
  }, [params]);

  return {
    entities: entities || [],
    params,
    limit: searchLimit,
    offset: searchOffset,
    count: result !== undefined ? result.count : 0,
    status: status !== undefined ? status.code : entities !== undefined ? 200 : 102,
    onReload: useCallback(() => dispatch(actions.api.search(entityType, params)), [params]),
    onChange: useCallback(
      (changedParams: Params<EntityTypeToEntity[T]>) => setParams(s => ({ ...s, ...changedParams })),
      []
    )
  };
};
