import React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";
import { ExerciseViewer } from "../../viewer/ExerciseViewer";

export const ExercisePage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id;

  return (
    <Page title="問題集の詳細">
      <ExerciseViewer entityId={exerciseId} />
    </Page>
  );
});
