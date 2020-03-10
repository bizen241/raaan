import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadRevisionDialog } from "../dialogs/revisions/UploadRevisionDialog";
import { Button, Card, Column, TextField } from "../ui";

export const RevisionEditor = React.memo<{
  revisionId: EntityId<"Revision">;
}>(({ revisionId }) => {
  const { buffer, params, onChange } = useBuffer("Revision", revisionId);

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateMessageSubject = useCallback((messageSubject: string) => onChange({ messageSubject }), []);
  const onUpdateMessageBody = useCallback((messageBody: string) => onChange({ messageBody }), []);

  const canUpload = buffer !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <TextField label="件名" defaultValue={params.messageSubject || ""} onChange={onUpdateMessageSubject} />
        <TextField label="本文" defaultValue={params.messageBody || ""} onChange={onUpdateMessageBody} />
      </Card>
      <UploadRevisionDialog revisionId={revisionId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
    </Column>
  );
});
