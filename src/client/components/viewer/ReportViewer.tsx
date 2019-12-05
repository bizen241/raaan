import { Gavel, Report as ReportIcon } from "@material-ui/icons";
import * as React from "react";
import { Report } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const ReportViewer = withEntity<Report, {}>({ entityType: "Report" })(({ entity: report }) => {
  const { state } = report;

  return (
    <Column>
      <Button
        color="primary"
        icon={<Gavel />}
        label={state === "pending" ? "対応する" : "編集する"}
        to={`/reports/${report.id}/edit`}
      />
      <Card icon={<ReportIcon />} title="クイズの報告">
        <Property label="理由">{report.reason}</Property>
        <Property label="説明">{report.description}</Property>
        <Property label="状態">{report.state}</Property>
        <Property label="コメント">{report.comment}</Property>
      </Card>
    </Column>
  );
});
