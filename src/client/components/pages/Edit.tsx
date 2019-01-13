import * as React from "react";
import { connector } from "../../reducers";
import { ContentEditor } from "../content/editor/ContentEditor";
import { PageProps } from "../project/Router";
import { Column } from "../ui";

export const Edit = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <Column padding="small" flex={1}>
        <ContentEditor id={id} />
      </Column>
    );
  }
);
