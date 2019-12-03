import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { ExerciseReport } from "../../../shared/api/entities";
import { ReportReason, ReportState } from "../../../shared/api/entities/BaseReportObject";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadExerciseReportDialog } from "../dialogs/exercise-reports/UploadExerciseReportDialog";
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

export const ExerciseReportEditor = withBuffer<ExerciseReport>("ExerciseReport")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateReason = useCallback((reason: ReportReason) => {
      onChange({ reason });
    }, []);
    const onUpdateDescription = useCallback((description: string) => {
      onChange({ description });
    }, []);
    const onUpdateState = useCallback((state: ReportState) => {
      onChange({ state });
    }, []);
    const onUpdateComment = useCallback((comment: string) => {
      onChange({ comment });
    }, []);

    const targetId = source.targetId || buffer.targetId;
    if (targetId === undefined) {
      return null;
    }

    const canUpload = (props.source !== undefined && props.buffer !== undefined) || buffer.reason !== undefined;
    const isOwner = currentUser.permission === "Owner";

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        {!isOwner ? (
          <Card>
            <Select<ReportReason>
              label="理由"
              options={selectReportReasonOptions}
              defaultValue={buffer.reason || source.reason}
              onChange={onUpdateReason}
            />
            <TextField
              label="説明"
              multiline
              defaultValue={buffer.description || source.description || ""}
              onChange={onUpdateDescription}
            />
          </Card>
        ) : (
          <Card>
            <Select<ReportState>
              label="状態"
              options={selectReportStateOptions}
              defaultValue={buffer.state || source.state}
              onChange={onUpdateState}
            />
            <TextField
              label="コメント"
              multiline
              defaultValue={buffer.comment || source.comment || ""}
              onChange={onUpdateComment}
            />
          </Card>
        )}
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
