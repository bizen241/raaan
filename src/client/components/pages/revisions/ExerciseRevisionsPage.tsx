import React from "react";
import { RevisionSummaryList } from "../../lists/revision-summaries/RevisionSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const ExerciseRevisionsPage = React.memo<PageProps>(({ match }) => {
  const exerciseId = match.params.id;

  return (
    <Page title="編集履歴">
      <RevisionSummaryList
        initialParams={{
          exerciseId,
          searchSort: "createdAt",
          searchOrder: "DESC"
        }}
      />
    </Page>
  );
});
