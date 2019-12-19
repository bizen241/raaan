import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadExerciseDraftDialog } from "../dialogs/exercise-drafts/UploadExerciseDraftDialog";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const ExerciseDraftEditor = withBuffer("ExerciseDraft")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const canUpload =
      (source && !source.isMerged) || (props.buffer !== undefined && currentUser.permission !== "Guest");

    return (
      <Column flex={1}>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <ExerciseEditor buffer={buffer} source={source} onChange={onChange} />
        <UploadExerciseDraftDialog
          exerciseDraftId={bufferId}
          exerciseId={source && source.exerciseId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
