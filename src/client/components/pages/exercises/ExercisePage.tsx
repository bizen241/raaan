import React from "react";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { ExerciseViewer } from "../../viewers/ExerciseViewer";

export const ExercisePage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id;

  return (
    <Page title="問題集の詳細">
      <ExerciseViewer entityId={exerciseId} />
    </Page>
  );
});
