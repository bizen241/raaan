import * as React from "react";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";
import { ExerciseObjectionViewer } from "../../viewer/ExerciseObjectionViewer";

export const ExerciseObjectionPage = React.memo<PageProps>(props => {
  const exerciseObjectionId = props.match.params.id;

  return (
    <Page title="クイズの報告の詳細">
      <ExerciseObjectionViewer entityId={exerciseObjectionId} />
    </Page>
  );
});
