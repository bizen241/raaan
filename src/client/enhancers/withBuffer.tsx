import { Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityId, EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { useEntity } from "../hooks/useEntity";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

interface Props<T extends EntityType> {
  bufferType: T;
  bufferId: EntityId<T>;
  buffer: Params<EntityTypeToEntity[T]> | undefined;
  source: EntityTypeToEntity[T] | undefined;
  params: Params<EntityTypeToEntity[T]>;
  onChange: (updatedParams: Params<EntityTypeToEntity[T]>) => void;
}

export const withBuffer = <T extends EntityType>(entityType: T) => (BaseComponent: React.ComponentType<Props<T>>) =>
  React.memo<{ bufferId: EntityId<T> }>(({ bufferId }) => {
    const dispatch = useDispatch();

    const { entity, getStatus } = useEntity(entityType, bufferId);
    const buffer = useSelector(
      (state: RootState) => state.buffers[entityType][bufferId] as Params<EntityTypeToEntity[T]> | undefined
    );

    const onChange = useCallback(
      (updatedParams: Params<EntityTypeToEntity[T]>) =>
        dispatch(actions.buffers.update(entityType, bufferId, updatedParams)),
      []
    );

    if (entity === undefined && !isLocalOnly(bufferId) && getStatus === 102) {
      return <Typography>ロード中です</Typography>;
    }

    const params = mergeBuffer(entity, buffer);

    return (
      <BaseComponent
        bufferType={entityType}
        bufferId={bufferId}
        buffer={buffer}
        source={entity}
        params={params}
        onChange={onChange}
      />
    );
  });

const mergeBuffer = <E extends EntityObject>(source: E | undefined, buffer: Params<E> | undefined = {}): Params<E> => ({
  ...source,
  ...buffer
});
