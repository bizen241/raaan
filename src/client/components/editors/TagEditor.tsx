import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadTagDialog } from "../dialogs/tags/UploadTagDialog";
import { Button, Card, Column, TextField } from "../ui";

export const TagEditor = React.memo<{
  tagId: EntityId<"Tag">;
}>(({ tagId }) => {
  const { buffer, params, onChange } = useBuffer("Tag", tagId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);

  const canUpload = buffer !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <TextField label="説明" defaultValue={params.description || ""} onChange={onUpdateDescription} />
      </Card>
      <UploadTagDialog tagId={tagId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
    </Column>
  );
});
