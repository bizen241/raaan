import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadUserDialog } from "../dialogs/users/UploadUserDialog";
import { Button, Column } from "../ui";

export const UserEditor = withBuffer("User")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateName = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ name: e.target.value }),
      []
    );

    const params = mergeBuffer(source, buffer);

    const canUpload = buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Column pb={1}>
          <Card>
            <CardContent>
              <Column pb={1}>
                <Typography color="textSecondary">ユーザー名</Typography>
                <TextField variant="outlined" defaultValue={params.name || ""} onChange={onUpdateName} />
              </Column>
            </CardContent>
          </Card>
        </Column>
        <UploadUserDialog userId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
