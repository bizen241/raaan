import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../reducers";
import { EntityEditor } from "../editor";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const EditExercisePage = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <Page>
        <h2 className={Classes.HEADING}>編集中</h2>
        <EntityEditor entityType="Exercise" entityId={id} />
      </Page>
    );
  }
);
