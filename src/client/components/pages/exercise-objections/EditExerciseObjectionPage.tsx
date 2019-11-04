import * as React from "react";
import { ExerciseObjectionEditor } from "../../editor/ExerciseObjectionEditor";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditExerciseObjectionPage = React.memo<PageProps>(({ match }) => {
  const exerciseObjectionId = match.params.id;

  return (
    <Page title="違反の報告を編集中">
      <ExerciseObjectionEditor bufferId={exerciseObjectionId} />
    </Page>
  );
});
