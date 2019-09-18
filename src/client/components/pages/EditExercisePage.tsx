import * as React from "react";
import { ExerciseDraftEditor } from "../editor/ExerciseEditor";
import { PageProps } from "../project/Router";
import { Page } from "../ui/Page";

const EditExerciseDraftPage = React.memo<PageProps>(({ match }) => {
  const bufferId = match.params.id;

  return (
    <Page>
      <ExerciseDraftEditor bufferId={bufferId} />
    </Page>
  );
});

export default EditExerciseDraftPage;
