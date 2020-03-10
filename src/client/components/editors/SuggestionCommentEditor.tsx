import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadSuggestionCommentDialog } from "../dialogs/suggestion-comments/UploadSuggestionCommentDialog";
import { Button, Card, Column, TextField } from "../ui";

export const SuggestionCommentEditor = React.memo<{
  suggestionCommentId: EntityId<"SuggestionComment">;
}>(({ suggestionCommentId }) => {
  const { buffer, params, onChange } = useBuffer("SuggestionComment", suggestionCommentId);
  if (params.targetId === undefined) {
    throw new BufferError("SuggestionComment", suggestionCommentId);
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
      <UploadSuggestionCommentDialog
        bufferId={suggestionCommentId}
        targetId={params.targetId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
