import { Gavel, Report } from "@material-ui/icons";
import * as React from "react";
import { ExerciseReport } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Button, Card, Column, Property } from "../ui";

export const ExerciseReportViewer = withEntity<ExerciseReport, {}>({ entityType: "ExerciseReport" })(
  ({ entity: exerciseReport }) => {
    const { state } = exerciseReport;

    return (
      <Column>
        <Button
          color="primary"
          icon={<Gavel />}
          label={state === "pending" ? "対応する" : "編集する"}
          to={`/exercise-reports/${exerciseReport.id}/edit`}
        />
        <Card icon={<Report />} title="クイズの報告">
          <Property label="理由">{exerciseReport.reason}</Property>
          <Property label="説明">{exerciseReport.description || "&nbsp"}</Property>
          <Property label="状態">{exerciseReport.state}</Property>
          <Property label="コメント">{exerciseReport.comment}</Property>
        </Card>
      </Column>
    );
  }
);
