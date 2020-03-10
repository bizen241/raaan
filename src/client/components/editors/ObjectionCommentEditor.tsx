import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadObjectionCommentDialog } from "../dialogs/objection-comments/UploadObjectionCommentDialog";
import { Button, Card, Column, TextField } from "../ui";

export const ObjectionCommentEditor = React.memo<{
  objectionCommentId: EntityId<"ObjectionComment">;
}>(({ objectionCommentId }) => {
  const { buffer, params, onChange } = useBuffer("ObjectionComment", objectionCommentId);
  if (params.targetId === undefined) {
    throw new BufferError("ObjectionComment", objectionCommentId);
  }

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateBody = useCallback((body: string) => {
    onChange({ body });
  }, []);

  const canUpload = buffer && buffer.body !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <TextField label="コメント" multiline defaultValue={params.body || ""} onChange={onUpdateBody} />
      </Card>
      <UploadObjectionCommentDialog
        bufferId={objectionCommentId}
        targetId={params.targetId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
