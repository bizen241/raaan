import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

export const useEntity = <E extends EntityObject>(
  entityType: EntityType,
  entityId: string,
  shouldFetch: boolean = true
) => {
  const dispatch = useDispatch();

  const entity = useSelector((state: RootState) => state.cache.get[entityType][entityId]);
  const getStatus = useSelector((state: RootState) => state.api.get[entityType][entityId]);
  const deleteStatus = useSelector((state: RootState) => state.api.delete[entityType][entityId]);

  useEffect(() => {
    if (shouldFetch && entity === undefined && !isLocalOnly(entityId) && deleteStatus === undefined) {
      dispatch(actions.api.get(entityType, entityId));
    }
  }, [entityId]);

  return {
    entity: entity as E | undefined,
    getStatus: getStatus && getStatus.code,
    onReload: useCallback(() => dispatch(actions.api.get(entityType, entityId)), [])
  };
};
