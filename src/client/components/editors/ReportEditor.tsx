import { CloudUpload } from "@material-ui/icons";
import React, { useCallback, useContext } from "react";
import { ReportReason, ReportState } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadReportDialog } from "../dialogs/reports/UploadReportDialog";
import { BrokenBuffer } from "../project/BrokenBuffer";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Select, SelectOptions, TextField } from "../ui";

const selectReportReasonOptions: SelectOptions<ReportReason> = {
  copyright: {
    label: "著作権の侵害"
  },
  sexual: {
    label: "性的な内容"
  },
  troll: {
    label: "荒らし行為"
  }
};

const selectReportStateOptions: SelectOptions<ReportState> = {
  pending: {
    label: "保留"
  },
  accepted: {
    label: "承認"
  },
  rejected: {
    label: "却下"
  }
};

export const ReportEditor = withBuffer("Report")(
  React.memo(({ bufferType, bufferId, buffer, source, params, onChange }) => {
    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateReason = useCallback((reason: ReportReason) => onChange({ reason }), []);
    const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);
    const onUpdateState = useCallback((state: ReportState) => onChange({ state }), []);
    const onUpdateComment = useCallback((comment: string) => onChange({ comment }), []);

    if (params.targetType === undefined || params.targetId === undefined) {
      return <BrokenBuffer bufferType={bufferType} bufferId={bufferId} />;
    }

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
          reportId={bufferId}
          targetType={params.targetType}
          targetId={params.targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
