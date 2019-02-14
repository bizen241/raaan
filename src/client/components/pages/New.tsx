import * as React from "react";
import { Redirect } from "react-router-dom";
import { connector } from "../../reducers";

export const New = connector(
  () => ({}),
  () => ({}),
  () => {
    const id = Date.now();

    return <Redirect to={`/contents/${id}/edit`} />;
  }
);
