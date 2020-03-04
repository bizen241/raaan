import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId, EntityType } from "../../shared/api/entities";
import { EntityError } from "../components/project/PageErrorBoundary";
import { actions, RootState } from "../reducers";
import { getEntity } from "../reducers/cache";

export const useEntity = <T extends EntityType>(entityType: T, entityId: EntityId<T>) => {
  const dispatch = useDispatch();

  const entityMap = useSelector((state: RootState) => state.cache.get[entityType]);
  const getStatus = useSelector((state: RootState) => state.api.get[entityType][entityId]);

  const entity = getEntity(entityMap, entityId);
  if (entity === undefined) {
    throw new EntityError(entityType, entityId);
  }

  return {
    entity,
    getStatus: getStatus !== undefined ? getStatus : entity !== undefined ? 200 : 102,
    onReload: useCallback(() => entityId && dispatch(actions.api.get(entityType, entityId)), [])
  };
};
