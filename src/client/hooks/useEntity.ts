import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

export const useEntity = <T extends EntityType>(entityType: T, entityId: EntityId<T>, shouldFetch: boolean = true) => {
  const dispatch = useDispatch();

  const entity = useSelector((state: RootState) => state.cache.get[entityType][entityId]);
  const getStatus = useSelector((state: RootState) => state.api.get[entityType][entityId]);
  const deleteStatus = useSelector((state: RootState) => state.api.delete[entityType][entityId]);

  useEffect(() => {
    if (shouldFetch && entity === undefined && !isLocalOnly(entityId) && deleteStatus === undefined) {
      dispatch(actions.api.get(entityType, entityId));
    }
  }, [entityId]);

  if (entity === undefined) {
    throw new Error();
  }

  return {
    entity: entity as EntityTypeToEntity[T],
    getStatus: getStatus !== undefined ? getStatus : entity !== undefined ? 200 : 102,
    onReload: useCallback(() => entityId && dispatch(actions.api.get(entityType, entityId)), [])
  };
};
