import * as React from "react";
import { connector } from "../../reducers";
import { ContentEditor } from "../content/editor/ContentEditor";
import { PageProps } from "../project/Router";

export const Edit = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <div>
        <ContentEditor id={id} />
      </div>
    );
  }
);
