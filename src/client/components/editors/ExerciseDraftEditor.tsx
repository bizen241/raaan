import { CloudUpload } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { PostExerciseDraftDialog } from "../dialogs/exercise-drafts/PostExerciseDraftDialog";
import { UpdateExerciseDraftDialog } from "../dialogs/exercise-drafts/UpdateExerciseDraftDialog";
import { Button, Column } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const ExerciseDraftEditor = React.memo<{
  exerciseDraftId: EntityId<"ExerciseDraft">;
}>(({ exerciseDraftId }) => {
  const { currentUser } = useCurrentUser();

  const { buffer, source, params, onChange } = useBuffer("ExerciseDraft", exerciseDraftId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const canUpload = (source && !source.isMerged) || (buffer !== undefined && currentUser.permission !== "Guest");

  return (
    <Column flex={1}>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <ExerciseEditor params={params} onChange={onChange} />
      {source && source.exerciseId ? (
        <UpdateExerciseDraftDialog
          exerciseDraftId={exerciseDraftId}
          exerciseDraft={params}
          exerciseId={source.exerciseId}
          onChange={onChange}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      ) : (
        <PostExerciseDraftDialog
          exerciseDraftId={exerciseDraftId}
          exerciseDraft={params}
          onChange={onChange}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      )}
    </Column>
  );
});
