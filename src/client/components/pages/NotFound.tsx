import * as React from "react";
import { connector } from "../../reducers";

export const NotFound = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return <div>NotFOund</div>;
  }
);
