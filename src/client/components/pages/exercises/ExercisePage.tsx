import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { ExerciseViewer } from "../../viewers/ExerciseViewer";

export const ExercisePage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id as EntityId<"Exercise">;

  return (
    <Page title="問題集の詳細">
      <ExerciseViewer exerciseId={exerciseId} />
    </Page>
  );
});
