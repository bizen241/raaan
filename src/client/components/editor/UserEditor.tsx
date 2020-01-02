import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadUserDialog } from "../dialogs/users/UploadUserDialog";
import { Button, Card, Column, TextField } from "../ui";

export const UserEditor = withBuffer("User")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateName = useCallback((name: string) => onChange({ name }), []);

    const params = mergeBuffer(source, buffer);

    const canUpload = buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField label="ユーザー名" defaultValue={params.name || ""} onChange={onUpdateName} />
        </Card>
        <UploadUserDialog userId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
