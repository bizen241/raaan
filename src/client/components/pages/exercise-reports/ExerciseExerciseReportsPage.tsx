import * as React from "react";
import { ExerciseReportList } from "../../list/exercise-reports/ExerciseReportList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const ExerciseExerciseReportsPage = React.memo<PageProps>(({ match }) => {
  const exerciseId = match.params.id;

  return (
    <Page title="クイズの報告">
      <ExerciseReportList
        initialParams={{
          targetId: exerciseId
        }}
      />
    </Page>
  );
});
