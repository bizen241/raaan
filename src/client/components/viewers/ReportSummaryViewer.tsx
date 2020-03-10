import { Link } from "@material-ui/core";
import { Delete, Report as ReportIcon } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { EntityId } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteReportDialog } from "../dialogs/reports/DeleteReportDialog";
import { Card, Menu, MenuItem, Property } from "../ui";

export const ReportSummaryViewer = React.memo<{
  reportSummaryId: EntityId<"ReportSummary">;
}>(({ reportSummaryId }) => {
  const { entity: reportSummary } = useEntity("ReportSummary", reportSummaryId);
  const { reason, state, commentCount } = reportSummary;

  const { currentUserId } = useCurrentUser();

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwn = reportSummary.reporterId === currentUserId;

  return (
    <Card
      icon={<ReportIcon />}
      title="報告"
      action={
        isOwn && (
          <Menu>
            <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
          </Menu>
        )
      }
    >
      <Property label="理由">{reason}</Property>
      <Property label="状態">{state}</Property>
      <Property label="コメント">
        <Link
          underline="always"
          color="textPrimary"
          component={RouterLink}
          to={`/reports/${reportSummary.parentId}/comments`}
        >
          {commentCount}
        </Link>
      </Property>
      {isOwn && (
        <DeleteReportDialog
          reportId={reportSummary.parentId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      )}
    </Card>
  );
});
