import { Gavel } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { hasPermission } from "../../../shared/api/security";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { PermissionDenied } from "../project/PermissionDenied";
import { Button, Card, Column, Property } from "../ui";
import { ReportSummaryViewer } from "./ReportSummaryViewer";

export const ReportViewer = React.memo<{
  reportId: EntityId<"Report">;
}>(({ reportId }) => {
  const { entity: report } = useEntity("Report", reportId);
  const { description, state } = report;

  const { currentUser } = useCurrentUser();

  const isOwner = currentUser.permission === "Owner";
  const isOwn = report.reporterId === currentUser.id;

  if (!isOwn && hasPermission(currentUser, "Admin")) {
    return <PermissionDenied />;
  }

  return (
    <Column>
      {isOwner && (
        <Button
          color="primary"
          icon={<Gavel />}
          label={state === "pending" ? "対応する" : "編集する"}
          to={`/reports/${report.id}/edit`}
        />
      )}
      <ReportSummaryViewer reportSummaryId={report.summaryId} />
      {description && (
        <Card>
          <Property label="説明">{description}</Property>
        </Card>
      )}
    </Column>
  );
});
