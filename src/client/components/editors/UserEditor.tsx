import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadUserDialog } from "../dialogs/users/UploadUserDialog";
import { Button, Card, Column, TextField } from "../ui";

export const UserEditor = React.memo<{
  userId: EntityId<"User">;
}>(({ userId }) => {
  const { buffer, params, onChange } = useBuffer("User", userId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateName = useCallback((name: string) => onChange({ name }), []);

  const canUpload = buffer !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <TextField label="ユーザー名" defaultValue={params.name || ""} onChange={onUpdateName} />
      </Card>
      <UploadUserDialog userId={userId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
    </Column>
  );
});
