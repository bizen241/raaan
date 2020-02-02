import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadTagDialog } from "../dialogs/tags/UploadTagDialog";
import { Button, Card, Column, TextField } from "../ui";

export const TagEditor = withBuffer("Tag")(
  React.memo(({ bufferId, buffer, params, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);

    const canUpload = buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField label="説明" defaultValue={params.description || ""} onChange={onUpdateDescription} />
        </Card>
        <UploadTagDialog tagId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
