import * as React from "react";
import { connector } from "../../reducers";
import { Editor } from "../editor/Editor";
import { PageProps } from "../project/Router";

export const Edit = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return (
      <div>
        <Editor id={id} />
      </div>
    );
  }
);
