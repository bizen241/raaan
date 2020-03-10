import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadReportCommentDialog } from "../dialogs/report-comments/UploadReportCommentDialog";
import { Button, Card, Column, TextField } from "../ui";

export const ReportCommentEditor = React.memo<{
  reportCommentId: EntityId<"ReportComment">;
}>(({ reportCommentId }) => {
  const { buffer, params, onChange } = useBuffer("ReportComment", reportCommentId);
  if (params.targetId === undefined) {
    throw new BufferError("ReportComment", reportCommentId);
  }

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateBody = useCallback((body: string) => {
    onChange({ body });
  }, []);

  const canUpload = buffer && buffer.body !== undefined;

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      <Card>
        <TextField label="コメント" multiline defaultValue={params.body || ""} onChange={onUpdateBody} />
      </Card>
      <UploadReportCommentDialog
        bufferId={reportCommentId}
        targetId={params.targetId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
