import * as React from "react";
import { connector } from "../../reducers";
import { ExerciseEditor } from "../editor/ExerciseEditor";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

const EditExercisePage = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <Page>
        <ExerciseEditor bufferId={id} />
      </Page>
    );
  }
);

export default EditExercisePage;
