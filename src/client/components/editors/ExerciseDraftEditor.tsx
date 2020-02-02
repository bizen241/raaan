import { CloudUpload } from "@material-ui/icons";
import React, { useContext } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { PostExerciseDraftDialog } from "../dialogs/exercise-drafts/PostExerciseDraftDialog";
import { UpdateExerciseDraftDialog } from "../dialogs/exercise-drafts/UpdateExerciseDraftDialog";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const ExerciseDraftEditor = withBuffer("ExerciseDraft")(
  React.memo(({ bufferId, buffer, source, params, onChange }) => {
    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const canUpload = (source && !source.isMerged) || (buffer !== undefined && currentUser.permission !== "Guest");

    return (
      <Column flex={1}>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <ExerciseEditor params={params} onChange={onChange} />
        {source && source.exerciseId ? (
          <UpdateExerciseDraftDialog
            exerciseDraftId={bufferId}
            exerciseDraft={params}
            exerciseId={source.exerciseId}
            onChange={onChange}
            isOpen={isUploadDialogOpen}
            onClose={onToggleUploadDialog}
          />
        ) : (
          <PostExerciseDraftDialog
            exerciseDraftId={bufferId}
            exerciseDraft={params}
            onChange={onChange}
            isOpen={isUploadDialogOpen}
            onClose={onToggleUploadDialog}
          />
        )}
      </Column>
    );
  })
);

/*
<IconButton icon={Hoge} onClick={onClick} />

バグの報告

useEntity

UndefinedError

<TableRow><TableCell>廃止

withEntity廃止
*/
