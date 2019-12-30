import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadExerciseDraftDialog } from "../dialogs/exercise-drafts/UploadExerciseDraftDialog";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const ExerciseDraftEditor = withBuffer("ExerciseDraft")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const params = mergeBuffer(source, buffer);

    const canUpload = (source && !source.isMerged) || (buffer !== undefined && currentUser.permission !== "Guest");

    return (
      <Column flex={1}>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <ExerciseEditor params={params} onChange={onChange} />
        <UploadExerciseDraftDialog
          exerciseDraftId={bufferId}
          exerciseDraft={buffer}
          exerciseId={source && source.exerciseId}
          onChange={onChange}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
