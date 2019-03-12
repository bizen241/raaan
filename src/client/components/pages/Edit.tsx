import * as React from "react";
import { connector } from "../../reducers";
import { ContentEditor } from "../content/editor/ContentEditor";
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
        <ContentEditor bufferId={id} />
      </Page>
    );
  }
);
