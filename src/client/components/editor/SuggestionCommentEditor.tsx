import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadSuggestionCommentDialog } from "../dialogs/suggestion-comments/UploadSuggestionCommentDialog";
import { Button, Card, Column, TextField } from "../ui";

export const SuggestionCommentEditor = withBuffer("SuggestionComment")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateBody = useCallback((body: string) => {
      onChange({ body });
    }, []);

    const params = mergeBuffer(source, buffer);
    if (params.targetId === undefined) {
      return null;
    }

    const canUpload = buffer && buffer.body !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField label="コメント" multiline defaultValue={params.body || ""} onChange={onUpdateBody} />
        </Card>
        <UploadSuggestionCommentDialog
          bufferId={bufferId}
          targetId={params.targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
