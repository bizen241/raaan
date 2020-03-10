import { CloudUpload, Message } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadSuggestionDialog } from "../dialogs/suggestions/UploadSuggestionDialog";
import { Button, Card, Column, TextField } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const SuggestionEditor = React.memo<{
  suggestionId: EntityId<"Suggestion">;
}>(({ suggestionId }) => {
  const { buffer, params, onChange } = useBuffer("Suggestion", suggestionId);
  if (params.exerciseId === undefined) {
    throw new BufferError("Suggestion", suggestionId);
  }

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateMessageSubject = useCallback((messageSubject: string) => onChange({ messageSubject }), []);
  const onUpdateMessageBody = useCallback((messageSubject: string) => onChange({ messageSubject }), []);

  const canUpload = buffer !== undefined;

  return (
    <Column flex={1}>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card icon={<Message />} title="メッセージ">
        <TextField label="件名" defaultValue={params.messageSubject || ""} onChange={onUpdateMessageSubject} />
        <TextField label="本文" multiline defaultValue={params.messageBody || ""} onChange={onUpdateMessageBody} />
      </Card>
      <ExerciseEditor params={params} onChange={onChange} />
      <UploadSuggestionDialog
        suggestionId={suggestionId}
        exerciseId={params.exerciseId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
