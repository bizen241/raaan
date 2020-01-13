import React from "react";
import { RevisionSummaryList } from "../../list/revision-summaries/RevisionSummaryList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

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
