import * as React from "react";
import { connector } from "../../reducers";
import { EntityEditor } from "../editor";
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
        <EntityEditor entityType="Exercise" entityId={id} />
      </Page>
    );
  }
);

export default EditExercisePage;
