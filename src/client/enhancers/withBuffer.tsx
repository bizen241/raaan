import { Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { useEntity } from "../hooks/entity";
import { actions, RootState } from "../reducers";
import { isLocalOnly } from "../reducers/api";

interface Props<E extends EntityObject> {
  bufferId: string;
  buffer: SaveParams<E> | undefined;
  source: Partial<E> | undefined;
  onChange: (params: SaveParams<E>) => void;
  onUpload: () => void;
}

export const withBuffer = <E extends EntityObject>(
  entityType: EntityType,
  BaseComponent: React.ComponentType<Props<E>>
) =>
  React.memo<{ bufferId: string }>(({ bufferId }) => {
    const dispatch = useDispatch();

    const { entity, uploadStatus } = useEntity<E>(entityType, bufferId);
    const buffer = useSelector((state: RootState) => state.buffers[entityType][bufferId] as SaveParams<E> | undefined);

    const onChange = useCallback(
      (params: SaveParams<E>) => dispatch(actions.buffers.update(entityType, bufferId, params)),
      []
    );
    const onUpload = useCallback(() => dispatch(actions.api.upload(entityType, bufferId)), []);

    if (uploadStatus === 102) {
      return <Typography>アップロード中です</Typography>;
    }
    if (uploadStatus === 200) {
      return <Typography>アップロードが完了しました</Typography>;
    }
    if (buffer === undefined && isLocalOnly(bufferId)) {
      return <Typography>バッファが削除されました</Typography>;
    }
    if (entity === undefined && !isLocalOnly(bufferId)) {
      return <Typography>ロード中です</Typography>;
    }

    return (
      <BaseComponent bufferId={bufferId} buffer={buffer} source={entity} onChange={onChange} onUpload={onUpload} />
    );
  });
