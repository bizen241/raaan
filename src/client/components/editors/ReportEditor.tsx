import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId, ReportReason, ReportState } from "../../../shared/api/entities";
import { useBuffer } from "../../hooks/useBuffer";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToggleState } from "../../hooks/useToggleState";
import { BufferError } from "../boundaries/FetchErrorBoundary";
import { UploadReportDialog } from "../dialogs/reports/UploadReportDialog";
import { Button, Card, Column, Select, SelectOptions, TextField } from "../ui";

const selectReportReasonOptions: SelectOptions<ReportReason> = {
  copyright: {
    label: "著作権の侵害",
  },
  sexual: {
    label: "性的な内容",
  },
  troll: {
    label: "荒らし行為",
  },
};

const selectReportStateOptions: SelectOptions<ReportState> = {
  pending: {
    label: "保留",
  },
  accepted: {
    label: "承認",
  },
  rejected: {
    label: "却下",
  },
};

export const ReportEditor = React.memo<{
  reportId: EntityId<"Report">;
}>(({ reportId }) => {
  const { currentUser } = useCurrentUser();

  const { buffer, source, params, onChange } = useBuffer("Report", reportId);
  if (params.targetType === undefined || params.targetId === undefined) {
    throw new BufferError("Report", reportId);
  }

  const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

  const onUpdateReason = useCallback((reason: ReportReason) => onChange({ reason }), []);
  const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);
  const onUpdateState = useCallback((state: ReportState) => onChange({ state }), []);
  const onUpdateComment = useCallback((comment: string) => onChange({ comment }), []);

  const canUpload =
    (source !== undefined && buffer !== undefined) || (buffer !== undefined && buffer.reason !== undefined);
  const isOwner = currentUser.permission === "Owner";

  return (
    <Column>
      <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
      {!isOwner ? (
        <Card>
          <Select<ReportReason>
            label="理由"
            options={selectReportReasonOptions}
            defaultValue={params.reason}
            onChange={onUpdateReason}
          />
          <TextField label="説明" multiline defaultValue={params.description || ""} onChange={onUpdateDescription} />
        </Card>
      ) : (
        <Card>
          <Select<ReportState>
            label="状態"
            options={selectReportStateOptions}
            defaultValue={params.state}
            onChange={onUpdateState}
          />
          <TextField label="コメント" multiline defaultValue={params.comment || ""} onChange={onUpdateComment} />
        </Card>
      )}
      <UploadReportDialog
        reportId={reportId}
        targetType={params.targetType}
        targetId={params.targetId}
        isOpen={isUploadDialogOpen}
        onClose={onToggleUploadDialog}
      />
    </Column>
  );
});
