import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { Column } from "./Flex";

export const Details: React.FunctionComponent<{
  onFocus?: () => void;
}> = ({ onFocus, children }) => {
  return (
    <Column className={`${Classes.TREE} ${Classes.ELEVATION_0}`} onFocus={onFocus}>
      {children}
    </Column>
  );
};
