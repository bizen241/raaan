import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { actions, RootState } from "../reducers";

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
