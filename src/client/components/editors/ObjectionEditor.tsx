import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId, ObjectionState } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadObjectionDialog } from "../dialogs/objections/UploadObjectionDialog";
import { Button, Card, Column, Select, SelectOptions, TextField } from "../ui";

const selectObjectionStateOptions: SelectOptions<ObjectionState> = {
  pending: {
    label: "保留"
  },
  accepted: {
    label: "承認"
  },
  rejected: {
    label: "却下"
  }
};

export const ObjectionEditor = React.memo<{
  objectionId: EntityId<"Objection">;
}>(({ objectionId }) => {
  const { currentUser } = useCurrentUser();

  const { buffer, params, onChange } = useBuffer("Objection", objectionId);
  if (params.targetType === undefined || params.targetId === undefined) {
    throw new BufferError("Objection", objectionId);
  }

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateDescription = useCallback((description: string) => {
    onChange({ description });
  }, []);
  const onUpdateState = useCallback((state: ObjectionState) => {
    onChange({ state });
  }, []);
  const onUpdateComment = useCallback((comment: string) => {
    onChange({ comment });
  }, []);

  const isOwner = currentUser.permission === "Owner";
  const canUpload = buffer !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      {!isOwner ? (
        <Card>
          <TextField label="説明" multiline defaultValue={params.description || ""} onChange={onUpdateDescription} />
        </Card>
      ) : (
        <Card>
          <Select<ObjectionState>
            label="状態"
            options={selectObjectionStateOptions}
            defaultValue={params.state}
            onChange={onUpdateState}
          />
          <TextField label="コメント" multiline defaultValue={params.comment || ""} onChange={onUpdateComment} />
        </Card>
      )}
      <UploadObjectionDialog
        objectionId={objectionId}
        targetType={params.targetType}
        targetId={params.targetId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
