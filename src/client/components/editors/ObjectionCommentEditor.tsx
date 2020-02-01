import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadObjectionCommentDialog } from "../dialogs/objection-comments/UploadObjectionCommentDialog";
import { BrokenBuffer } from "../project/BrokenBuffer";
import { Button, Card, Column, TextField } from "../ui";

export const ObjectionCommentEditor = withBuffer("ObjectionComment")(
  React.memo(({ bufferType, bufferId, buffer, params, onChange }) => {
    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateBody = useCallback((body: string) => {
      onChange({ body });
    }, []);

    if (params.targetId === undefined) {
      return <BrokenBuffer bufferType={bufferType} bufferId={bufferId} />;
    }

    const canUpload = buffer && buffer.body !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField label="コメント" multiline defaultValue={params.body || ""} onChange={onUpdateBody} />
        </Card>
        <UploadObjectionCommentDialog
          bufferId={bufferId}
          targetId={params.targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
