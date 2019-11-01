import { Report } from "@material-ui/icons";
import * as React from "react";
import { ExerciseReport } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Card, Column, Property } from "../ui";

export const ExerciseReportViewer = withEntity<ExerciseReport, {}>({ entityType: "ExerciseReport" })(
  ({ entity: exerciseReport }) => {
    return (
      <Column>
        <Card icon={<Report />} title="クイズの報告">
          <Property label="理由">{exerciseReport.reason}</Property>
          <Property label="状態">{exerciseReport.state}</Property>
        </Card>
      </Column>
    );
  }
);
