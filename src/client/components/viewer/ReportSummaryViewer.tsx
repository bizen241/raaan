import { Link } from "@material-ui/core";
import { Delete, Report as ReportIcon } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { DeleteReportDialog } from "../dialogs/reports/DeleteReportDialog";
import { UserContext } from "../project/Context";
import { Card, Menu, MenuItem, Property } from "../ui";

export const ReportSummaryViewer = withEntity("ReportSummary")(({ entity: reportSummary }) => {
  const { reason, state, commentCount } = reportSummary;

  const currentUser = useContext(UserContext);

  const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

  const isOwn = reportSummary.reporterId === currentUser.id;

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
        <DeleteReportDialog reportId={reportSummary.id} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      )}
    </Card>
  );
});
