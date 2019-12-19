import * as React from "react";
import { withBuffer } from "../../enhancers/withBuffer";

export const SuggestionEditor = withBuffer("Suggestion")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    return null;
  })
);
