import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadGroupDialog } from "../dialogs/groups/UploadGroupDialog";
import { Button, Card, Column, TextField } from "../ui";

export const GroupEditor = React.memo<{
  groupId: EntityId<"Group">;
}>(({ groupId }) => {
  const { buffer, params, onChange } = useBuffer("Group", groupId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateName = useCallback((name: string) => onChange({ name }), []);
  const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);

  const canUpload = buffer !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <TextField label="グループ名" defaultValue={params.name || ""} onChange={onUpdateName} />
        <TextField label="説明" defaultValue={params.description || ""} onChange={onUpdateDescription} />
      </Card>
      <UploadGroupDialog groupId={groupId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
    </Column>
  );
});
