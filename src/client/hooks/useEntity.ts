import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

export const useEntity = <T extends EntityType>(
  entityType: T,
  entityId: string | undefined,
  shouldFetch: boolean = true
) => {
  const dispatch = useDispatch();

  const entity = useSelector((state: RootState) => entityId && state.cache.get[entityType][entityId]);
  const getStatus = useSelector((state: RootState) => entityId && state.api.get[entityType][entityId]);
  const deleteStatus = useSelector((state: RootState) => entityId && state.api.delete[entityType][entityId]);

  useEffect(() => {
    if (
      shouldFetch &&
      entity === undefined &&
      entityId !== undefined &&
      !isLocalOnly(entityId) &&
      deleteStatus === undefined
    ) {
      dispatch(actions.api.get(entityType, entityId));
    }
  }, [entityId]);

  return {
    entity: entity as EntityTypeToEntity[T] | undefined,
    getStatus: getStatus && getStatus.code,
    onReload: useCallback(() => entityId && dispatch(actions.api.get(entityType, entityId)), [])
  };
};
