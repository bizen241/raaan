import * as React from "react";
import { ExerciseObjectionBufferList } from "../../list/exercise-objections/ExerciseObjectionBufferList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const EditExerciseObjectionsPage = React.memo<PageProps>(() => {
  return (
    <Page title="未保存の異議">
      <ExerciseObjectionBufferList />
    </Page>
  );
});
