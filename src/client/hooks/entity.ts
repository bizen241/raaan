import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

export const useEntity = <E extends EntityObject>(entityType: EntityType, entityId: string) => {
  const dispatch = useDispatch();
  const { entity, ...status } = useSelector((state: RootState) => ({
    entity: state.cache.get[entityType][entityId],
    getStatus: state.api.get[entityType][entityId],
    deleteStatus: state.api.delete[entityType][entityId],
    uploadStatus: state.api.upload[entityType][entityId]
  }));

  useEffect(() => {
    if (entity === undefined && status.deleteStatus !== 200 && !isLocalOnly(entityId)) {
      dispatch(actions.api.get(entityType, entityId));
    }
  }, [entityId]);

  return {
    entity: entity as E | undefined,
    ...status
  };
};
