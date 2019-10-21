import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { ExerciseReport } from "../../../shared/api/entities";
import { ReportReason } from "../../../shared/api/entities/BaseReportObject";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadExerciseReportDialog } from "../dialogs/reports/UploadExerciseReportDialog";
import { Button, Column, Select } from "../ui";

const reasonToLabel: { [P in ReportReason]: string } = {
  copyright: "著作権の侵害",
  sexual: "性的な内容",
  troll: "荒らし行為"
};

export const ExerciseReportEditor = withBuffer<ExerciseReport>("ExerciseReport")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateReason = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ reason: e.target.value as ReportReason });
    }, []);
    const onUpdateComment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ comment: e.target.value });
    }, []);

    const targetId = source.targetId || buffer.targetId;
    if (targetId === undefined) {
      return null;
    }

    const canUpload = (props.source !== undefined && props.buffer !== undefined) || buffer.reason !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <CardContent>
            <Column pb={1}>
              <Select label="理由" defaultValue={buffer.reason || source.reason || ""} onChange={onUpdateReason}>
                <option value="" disabled>
                  選択してください
                </option>
                {Object.entries(reasonToLabel).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            </Column>
            <Column pb={1}>
              <Typography color="textSecondary">コメント</Typography>
              <TextField
                variant="outlined"
                multiline
                defaultValue={buffer.comment || source.comment || ""}
                onChange={onUpdateComment}
              />
            </Column>
          </CardContent>
        </Card>
        <UploadExerciseReportDialog
          reportId={bufferId}
          targetId={targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
