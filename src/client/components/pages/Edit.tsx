import * as React from "react";
import { connector } from "../../reducers";
import { EntityEditor } from "../editor";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const Edit = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <Page heading="編集">
        <EntityEditor entityType="ExerciseDetail" entityId={id} />
      </Page>
    );
  }
);
