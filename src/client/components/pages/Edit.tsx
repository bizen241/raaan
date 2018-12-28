import * as React from "react";
import { connector } from "../../reducers";
import { PageProps } from "../project/Router";

export const Edit = connector(
  (_, ownProps: PageProps) => ({
    id: ownProps.match.params.id
  }),
  () => ({}),
  ({ id }) => {
    return <div>Edit {id}</div>;
  }
);
