import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { defaultSearchLimit, defaultSearchOffset, Params } from "../../shared/api/request/params";
import { stringifyParams } from "../api/request/search";
import { SearchError } from "../components/boundaries/FetchErrorBoundary";
import { actions, RootState } from "../reducers";

export const useSearch = <T extends EntityType>(
  entityType: T,
  initialParams: Params<EntityTypeToEntity[T]>,
  shouldFetch: boolean = true
) => {
  const dispatch = useDispatch();

  const [params, setParams] = useState<Params<EntityTypeToEntity[T]>>(initialParams);
  const { searchLimit = defaultSearchLimit, searchOffset = defaultSearchOffset } = params;

  const resultMap = useSelector((state: RootState) => state.cache.search[entityType]);
  const entityMap = useSelector((state: RootState) => state.cache.get[entityType]);

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

  if (entities === undefined && shouldFetch) {
    throw new SearchError(entityType, params);
  }

  const onReload = useCallback(() => dispatch(actions.api.search(entityType, params)), [params]);
  const onChange = useCallback((changed: Params<EntityTypeToEntity[T]>) => setParams(s => ({ ...s, ...changed })), []);

  return {
    entities: entities || [],
    params,
    limit: searchLimit,
    offset: searchOffset,
    count: (result && result.count) || 0,
    onReload,
    onChange
  };
};
