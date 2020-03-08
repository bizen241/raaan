import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId, EntityType } from "../../shared/api/entities";
import { EntityError } from "../components/boundaries/FetchErrorBoundary";
import { actions, RootState } from "../reducers";
import { getEntity } from "../reducers/cache";

export const useEntity = <T extends EntityType>(entityType: T, entityId: EntityId<T>) => {
  const dispatch = useDispatch();

  const entityMap = useSelector((state: RootState) => state.cache.get[entityType]);

  const entity = getEntity(entityMap, entityId);
  if (entity === undefined) {
    throw new EntityError(entityType, entityId);
  }

  return {
    entity,
    onReload: useCallback(() => entityId && dispatch(actions.api.get(entityType, entityId)), [])
  };
};
