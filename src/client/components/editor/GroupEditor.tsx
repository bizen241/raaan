import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadGroupDialog } from "../dialogs/groups/UploadGroupDialog";
import { Button, Column } from "../ui";

export const GroupEditor = withBuffer("Group")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateName = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ name: e.target.value }),
      []
    );
    const onUpdateDescription = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ description: e.target.value }),
      []
    );

    const canUpload = props.buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Column pb={1}>
          <Card>
            <CardContent>
              <Column pb={1}>
                <Typography color="textSecondary">グループ名</Typography>
                <TextField variant="outlined" defaultValue={buffer.name || source.name || ""} onChange={onUpdateName} />
              </Column>
              <Column>
                <Typography color="textSecondary">説明</Typography>
                <TextField
                  variant="outlined"
                  defaultValue={buffer.description || source.description || ""}
                  onChange={onUpdateDescription}
                />
              </Column>
            </CardContent>
          </Card>
        </Column>
        <UploadGroupDialog groupId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
