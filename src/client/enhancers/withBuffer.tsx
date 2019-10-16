import { Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { useEntity } from "../hooks/useEntity";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

interface Props<E extends EntityObject> {
  bufferId: string;
  buffer: Params<E> | undefined;
  source: Params<E> | undefined;
  onChange: (params: Params<E>) => void;
}

export const withBuffer = <E extends EntityObject>(entityType: EntityType) => (
  BaseComponent: React.ComponentType<Props<E>>
) =>
  React.memo<{ bufferId: string }>(({ bufferId }) => {
    const dispatch = useDispatch();

    const { entity, getStatus } = useEntity<E>(entityType, bufferId);
    const buffer = useSelector((state: RootState) => state.buffers[entityType][bufferId] as Params<E> | undefined);

    const onChange = useCallback(
      (params: Params<E>) => dispatch(actions.buffers.update(entityType, bufferId, params)),
      []
    );

    if (entity === undefined && !isLocalOnly(bufferId) && getStatus === 102) {
      return <Typography>ロード中です</Typography>;
    }

    return <BaseComponent bufferId={bufferId} buffer={buffer} source={entity} onChange={onChange} />;
  });
