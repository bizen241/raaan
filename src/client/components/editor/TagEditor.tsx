import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadTagDialog } from "../dialogs/tags/UploadTagDialog";
import { Button, Card, Column, TextField } from "../ui";

export const TagEditor = withBuffer("Tag")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);

    const params = mergeBuffer(source, buffer);

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
