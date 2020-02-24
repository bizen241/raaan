import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { RevisionSummaryList } from "../../lists/revision-summaries/RevisionSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const ExerciseRevisionsPage = React.memo<PageProps>(({ match }) => {
  const exerciseId = match.params.id as EntityId<"Exercise">;

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
