import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { Column } from "../../../../ui";
import { Chars } from "../chars/Chars";

export const UntypedLines: React.FunctionComponent<{
  value: string;
}> = ({ value: untypedLines }) => {
  return (
    <Column>
      <Chars className={Classes.TEXT_DISABLED}>{untypedLines}</Chars>
    </Column>
  );
};
