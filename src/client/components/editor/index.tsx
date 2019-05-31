import { Button, Card, CardHeader, CircularProgress, Divider } from "@material-ui/core";
import { CloudUpload, Done, Error } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { isLocalOnly } from "../../reducers/api";
import { Buffer } from "../../reducers/buffers";
import { Column } from "../ui";

export interface EntityEditorContainerProps {
  bufferId: string;
}

export interface EntityEditorRendererProps<E extends EntityObject> {
  bufferId: string;
  buffer: Buffer<E>;
}

export const EntityEditor = connector(
  (
    state,
    {
      entityType,
      bufferId,
      rendererComponent
    }: {
      entityType: EntityType;
      bufferId: string;
      rendererComponent: React.ComponentType<EntityEditorRendererProps<any>>;
    }
  ) => ({
    entityType,
    bufferId,
    rendererComponent,
    buffer: state.buffers[entityType][bufferId],
    loadStatus: state.api.get[entityType][bufferId],
    uploadStatus: state.api.upload[entityType][bufferId]
  }),
  actions => ({
    load: actions.buffers.load,
    upload: actions.api.upload
  }),
  ({ entityType, bufferId, buffer, rendererComponent: Renderer, uploadStatus, load, upload }) => {
    useEffect(() => {
      if (buffer === undefined) {
        load(entityType, bufferId);
      }
    }, []);

    const onUpload = useCallback(() => upload(entityType, bufferId), []);

    if (uploadStatus === 102) {
      return (
        <Card>
          <CardHeader avatar={<CircularProgress />} title="アップロード中です" />
        </Card>
      );
    }
    if (uploadStatus === 200) {
      return (
        <Card>
          <CardHeader avatar={<Done />} title="アップロードが完了しました" />
        </Card>
      );
    }

    if (buffer === undefined) {
      if (isLocalOnly(bufferId)) {
        return (
          <Card>
            <CardHeader avatar={<Error />} title="バッファが見つかりませんでした" />
          </Card>
        );
      } else {
        return (
          <Card>
            <CardHeader avatar={<CircularProgress />} title="ロード中です" />
          </Card>
        );
      }
    }

    return (
      <Column>
        <Column padding="vertical">
          <Button variant="outlined" size="large" onClick={onUpload}>
            <CloudUpload style={{ marginRight: "0.5em" }} />
            アップロード
          </Button>
        </Column>
        <Column padding="vertical">
          <Divider variant="middle" />
        </Column>
        <Renderer bufferId={bufferId} buffer={buffer} />
      </Column>
    );
  }
);
