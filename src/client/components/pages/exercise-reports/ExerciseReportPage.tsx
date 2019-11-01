import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ExerciseReportViewer } from "../../viewer/ExerciseReportViewer";

export const ExerciseReportPage = React.memo<PageProps>(props => {
  const exerciseReportId = props.match.params.id;

  return (
    <Page title="クイズの報告の詳細">
      <ExerciseReportViewer entityId={exerciseReportId} />
    </Page>
  );
});
