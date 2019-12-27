import { Gavel, Report as ReportIcon } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { UserContext } from "../project/Context";
import { Button, Card, Column, Property } from "../ui";

export const ReportViewer = withEntity("Report")(({ entity: report }) => {
  const { reason, description, state } = report;

  const currentUser = useContext(UserContext);

  const isOwner = currentUser.permission === "Owner";

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
      <Card icon={<ReportIcon />} title="報告">
        <Property label="理由">{reason}</Property>
        {description && <Property label="説明">{description}</Property>}
        <Property label="状態">{state}</Property>
      </Card>
    </Column>
  );
});
