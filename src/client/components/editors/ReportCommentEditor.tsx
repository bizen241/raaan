import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadReportCommentDialog } from "../dialogs/report-comments/UploadReportCommentDialog";
import { BrokenBuffer } from "../project/BrokenBuffer";
import { Button, Card, Column, TextField } from "../ui";

export const ReportCommentEditor = withBuffer("ReportComment")(
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
        <UploadReportCommentDialog
          bufferId={bufferId}
          targetId={params.targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
