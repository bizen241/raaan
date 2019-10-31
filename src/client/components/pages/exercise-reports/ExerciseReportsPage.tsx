import * as React from "react";
import { ExerciseReportList } from "../../list/exercise-reports/ExerciseReportList";
import { Page } from "../../ui";

export const ExerciseReportsPage = React.memo(() => {
  return (
    <Page title="クイズの報告の一覧">
      <ExerciseReportList initialParams={{}} />
    </Page>
  );
});
