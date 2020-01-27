import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { mergeBuffer } from "../../reducers/buffers";
import { UploadRevisionDialog } from "../dialogs/revisions/UploadRevisionDialog";
import { Button, Card, Column, TextField } from "../ui";

export const RevisionEditor = withBuffer("Revision")(
  React.memo(({ bufferId, buffer, source, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateMessageSubject = useCallback((messageSubject: string) => onChange({ messageSubject }), []);
    const onUpdateMessageBody = useCallback((messageBody: string) => onChange({ messageBody }), []);

    const params = mergeBuffer(source, buffer);

    const canUpload = buffer !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField label="件名" defaultValue={params.messageSubject || ""} onChange={onUpdateMessageSubject} />
          <TextField label="本文" defaultValue={params.messageBody || ""} onChange={onUpdateMessageBody} />
        </Card>
        <UploadRevisionDialog revisionId={bufferId} isOpen={isUploadDialogOpen} onClose={onToggleUploadDialog} />
      </Column>
    );
  })
);
