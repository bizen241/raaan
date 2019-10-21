import * as React from "react";
import { ExerciseReportEditor } from "../../editor/ExerciseReportEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditExerciseReportPage = React.memo<PageProps>(({ match }) => {
  const reportId = match.params.id;

  return (
    <Page title="違反の報告を編集中">
      <ExerciseReportEditor bufferId={reportId} />
    </Page>
  );
});
