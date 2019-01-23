import * as React from "react";
import { Redirect } from "react-router-dom";
import * as uuid from "uuid/v4";
import { connector } from "../../reducers";

export const New = connector(
  () => ({}),
  () => ({}),
  () => {
    const id = uuid();

    return <Redirect to={`/revisions/${id}/edit`} />;
  }
);
