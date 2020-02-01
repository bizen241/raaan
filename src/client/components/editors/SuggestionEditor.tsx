import { CloudUpload, Message } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadSuggestionDialog } from "../dialogs/suggestions/UploadSuggestionDialog";
import { BrokenBuffer } from "../project/BrokenBuffer";
import { Button, Card, Column, TextField } from "../ui";
import { ExerciseEditor } from "./ExerciseEditor";

export const SuggestionEditor = withBuffer("Suggestion")(
  React.memo(({ bufferType, bufferId, buffer, params, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateMessageSubject = useCallback((messageSubject: string) => onChange({ messageSubject }), []);
    const onUpdateMessageBody = useCallback((messageSubject: string) => onChange({ messageSubject }), []);

    if (params.exerciseId === undefined) {
      return <BrokenBuffer bufferType={bufferType} bufferId={bufferId} />;
    }
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
          suggestionId={bufferId}
          exerciseId={params.exerciseId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
