import * as React from "react";
import { ExerciseReportBufferList } from "../../list/exercise-reports/ExerciseReportBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditGroupsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の報告">
      <ExerciseReportBufferList />
    </Page>
  );
});
