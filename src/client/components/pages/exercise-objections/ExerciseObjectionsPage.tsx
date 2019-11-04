import * as React from "react";
import { ExerciseObjectionList } from "../../list/exercise-objections/ExerciseObjectionList";
import { Page } from "../../ui";

export const ExerciseObjectionsPage = React.memo(() => {
  return (
    <Page title="クイズの異議の一覧">
      <ExerciseObjectionList initialParams={{}} />
    </Page>
  );
});
