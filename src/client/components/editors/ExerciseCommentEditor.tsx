import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadExerciseCommentDialog } from "../dialogs/exercise-comments/UploadExerciseCommentDialog";
import { Button, Card, Column, TextField } from "../ui";

export const ExerciseCommentEditor = React.memo<{
  exerciseCommentId: EntityId<"ExerciseComment">;
}>(({ exerciseCommentId }) => {
  const { buffer, params, onChange } = useBuffer("ExerciseComment", exerciseCommentId);
  if (params.targetId === undefined) {
    throw new BufferError("ExerciseComment", exerciseCommentId);
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
      <UploadExerciseCommentDialog
        bufferId={exerciseCommentId}
        targetId={params.targetId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
