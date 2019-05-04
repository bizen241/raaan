import { Button, Callout } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { connector } from "../../reducers";
import { isLocalOnly } from "../../reducers/api";
import { Buffer } from "../../reducers/buffers";
import { Column, Row } from "../ui";
import { ExerciseDetailEditor } from "./ExerciseDetailEditor";
import { UserConfigEditor } from "./UserConfigEditor";
import { UserEditor } from "./UserEditor";

export const EntityEditor = connector(
  (state, { entityType, entityId }: { entityType: EntityType; entityId: string }) => ({
    entityType,
    bufferId: entityId,
    buffer: state.buffers[entityType][entityId],
    loadStatus: state.api.get[entityType][entityId],
    uploadStatus: state.api.upload[entityType][entityId]
  }),
  actions => ({
    load: actions.buffers.load,
    upload: actions.api.upload
  }),
  ({ entityType, bufferId, buffer, uploadStatus, load, upload }) => {
    useEffect(() => {
      if (buffer === undefined) {
        load(entityType, bufferId);
      }
    }, []);

    const onUpload = useCallback(() => upload(entityType, bufferId), []);

    if (uploadStatus === 102) {
      return (
        <Column padding>
          <Callout intent="primary" title="アップロード中です" />
        </Column>
      );
    }
    if (uploadStatus === 200) {
      return (
        <Column padding>
          <Callout intent="success" title="アップロードが完了しました" />
        </Column>
      );
    }

    if (buffer === undefined) {
      if (isLocalOnly(bufferId)) {
        return (
          <Column padding>
            <Callout intent="warning" title="バッファが見つかりませんでした" />
          </Column>
        );
      } else {
        return (
          <Column padding>
            <Callout intent="primary" title="ロード中です" />
          </Column>
        );
      }
    }

    const Editor = editors[entityType];
    if (Editor === undefined) {
      throw new Error("Editor is not defined");
    }

    return (
      <Column>
        <Column padding>
          <Button text="保存" icon="upload" onClick={onUpload} />
        </Column>
        <Editor bufferId={bufferId} buffer={buffer} />
      </Column>
    );
  }
);

export type EntityEditorProps<E extends EntityObject = EntityObject> = {
  bufferId: string;
  buffer: Buffer<E>;
};

const editors: { [T in EntityType]?: React.ComponentType<EntityEditorProps> } = {
  ExerciseDetail: ExerciseDetailEditor,
  User: UserEditor,
  UserConfig: UserConfigEditor
};
