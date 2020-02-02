import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadGroupDialog } from "../dialogs/groups/UploadGroupDialog";
import { Button, Card, Column, TextField } from "../ui";

export const GroupEditor = withBuffer("Group")(
  React.memo(({ bufferId, buffer, params, onChange }) => {
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
        <UploadGroupDialog groupId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
