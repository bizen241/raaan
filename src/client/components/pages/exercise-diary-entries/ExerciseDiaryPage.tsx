import * as React from "react";
import { ExerciseDiaryGraph } from "../../graphs/ExerciseDiaryGraph";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const ExerciseDiaryPage = React.memo<PageProps>(props => {
  const exerciseId = props.match.params.id;

  return (
    <Page title="問題集の記録">
      <ExerciseDiaryGraph entityId={exerciseId} />
    </Page>
  );
});
