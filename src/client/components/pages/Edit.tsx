import * as React from "react";
import { connector } from "../../reducers";
import { EntityEditor } from "../editor";
import { Header } from "../project/Header";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const Edit = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <Page>
        <Header heading="編集" />
        <EntityEditor entityType="ContentRevision" entityId={id} />
      </Page>
    );
  }
);
