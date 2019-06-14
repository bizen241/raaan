import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { stringifySearchParams } from "../api/request/search";
import { actions, RootState } from "../reducers";

export const useSearch = <E extends EntityObject>(entityType: EntityType, searchParams: SearchParams<E>) => {
  const dispatch = useDispatch();

  const { searchResultMap, entityMap } = useSelector((state: RootState) => ({
    searchResultMap: state.cache.search[entityType],
    entityMap: state.cache.get[entityType]
  }));

  const searchQuery = stringifySearchParams(searchParams, true);
  const searchResult = searchResultMap[searchQuery];
  const selectedEntities = useMemo(() => {
    if (searchResult === undefined) {
      return undefined;
    }

    const { offset, limit } = searchParams;

    const entities: EntityObject[] = [];
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

      entities.push(entity);
    }

    return entities;
  }, [searchResult, entityMap]);

  useEffect(() => {
    if (searchResult === undefined || selectedEntities === undefined) {
      dispatch(actions.api.search(entityType, searchParams));
    }
  }, [searchParams]);

  return {
    searchResult,
    selectedEntities: selectedEntities as E[]
  };
};

export const useEntity = <E extends EntityObject>(entityType: EntityType, entityId: string) => {
  const dispatch = useDispatch();
  const { entity, getStatus, deleteStatus } = useSelector((state: RootState) => ({
    entity: state.cache.get[entityType][entityId],
    getStatus: state.api.get[entityType][entityId],
    deleteStatus: state.api.delete[entityType][entityId]
  }));

  useEffect(() => {
    if (entity === undefined) {
      dispatch(actions.api.get(entityType, entityId));
    }
  }, []);

  return {
    entity: entity as E | undefined,
    getStatus,
    deleteStatus
  };
};
