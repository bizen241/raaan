import * as React from "react";
import { Redirect } from "react-router-dom";
import { connector } from "../../reducers";

export const New = connector(
  () => ({}),
  () => ({}),
  () => {
    const id = new Date().valueOf();

    return <Redirect to={`/revisions/${id}/edit`} />;
  }
);
