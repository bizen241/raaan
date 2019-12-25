import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadSuggestionDialog } from "../dialogs/suggestions/UploadSuggestionDialog";
import { Button, Card, Column, TextField } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const SuggestionEditor = withBuffer("Suggestion")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const exerciseId = source.exerciseId || buffer.exerciseId;
    if (exerciseId === undefined) {
      return null;
    }

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateMessage = useCallback((message: string) => onChange({ message }), []);

    const canUpload = props.buffer !== undefined;

    return (
      <Column flex={1}>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField
            label="メッセージ"
            defaultValue={buffer.message || source.message || ""}
            onChange={onUpdateMessage}
          />
        </Card>
        <ExerciseEditor buffer={buffer} source={source} onChange={onChange} />
        <UploadSuggestionDialog
          suggestionId={bufferId}
          exerciseId={exerciseId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
