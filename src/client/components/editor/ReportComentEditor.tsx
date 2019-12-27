import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadReportCommentDialog } from "../dialogs/report-comments/UploadReportCommentDialog";
import { Button, Card, Column, TextField } from "../ui";

export const ReportCommentEditor = withBuffer("ReportComment")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateBody = useCallback((body: string) => {
      onChange({ body });
    }, []);

    const targetId = source.targetId || buffer.targetId;
    if (targetId === undefined) {
      return null;
    }

    const canUpload = buffer.body !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField
            label="コメント"
            multiline
            defaultValue={buffer.body || source.body || ""}
            onChange={onUpdateBody}
          />
        </Card>
        <UploadReportCommentDialog
          bufferId={bufferId}
          targetId={targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
