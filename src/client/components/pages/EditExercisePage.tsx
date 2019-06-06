import * as React from "react";
import { ExerciseEditor } from "../editor/ExerciseEditor";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

const EditExercisePage = React.memo<PageProps>(({ match }) => {
  const bufferId = match.params.id;

  return (
    <Page>
      <ExerciseEditor bufferId={bufferId} />
    </Page>
  );
});

export default EditExercisePage;
