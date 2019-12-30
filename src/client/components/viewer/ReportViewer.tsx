import { Gavel } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Property } from "../ui";
import { ReportSummaryViewer } from "./ReportSummaryViewer";

export const ReportViewer = withEntity("Report")(({ entity: report }) => {
  const { description, state } = report;

  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";
  const isOwn = report.reporterId === currentUser.id;

  if (!isOwner && !isOwn) {
    return null;
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
      <ReportSummaryViewer entityId={report.summaryId} />
      {description && (
        <Card>
          <Property label="説明">{description}</Property>
        </Card>
      )}
    </Column>
  );
});
