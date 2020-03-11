import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EntityId, EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { EntityError } from "../components/boundaries/FetchErrorBoundary";
import { actions, useSelector } from "../reducers";
import { getBuffer } from "../reducers/buffers";
import { getEntity } from "../reducers/cache";
import { isLocalEntityId } from "../reducers/entity";

export const useBuffer = <T extends EntityType>(entityType: T, entityId: EntityId<T>) => {
  const dispatch = useDispatch();

  const entityMap = useSelector(state => state.cache.get[entityType]);
  const bufferMap = useSelector(state => state.buffers[entityType]);

  const entity = getEntity(entityMap, entityId);
  if (entity === undefined && !isLocalEntityId(entityId)) {
    throw new EntityError(entityType, entityId);
  }

  const buffer = getBuffer(bufferMap, entityId);

  const onChange = useCallback(
    (params: Params<EntityTypeToEntity[T]>) => dispatch(actions.buffers.update(entityType, entityId, params)),
    []
  );

  return {
    buffer,
    source: entity,
    params: mergeBuffer(entity, buffer),
    onChange
  };
};

const mergeBuffer = <E extends EntityObject>(source: E | undefined, buffer: Params<E> | undefined = {}): Params<E> => ({
  ...source,
  ...buffer
});
