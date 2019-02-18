import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { styled } from "../../../../../style";
import { Column } from "../../../../ui";
import { Chars } from "../chars/Chars";

const Outer = styled(Column)`
  overflow: hidden;
`;

export const UntypedLines: React.FunctionComponent<{
  value: string;
}> = ({ value: untypedLines }) => (
  <Outer>
    <Chars className={Classes.TEXT_DISABLED}>{untypedLines}</Chars>
  </Outer>
);
