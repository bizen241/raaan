import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { styled } from "../../../../../style";
import { Chars } from "./Chars";

const Outer = styled.div`
  flex-shrink: 0;
  max-width: 50%;
  overflow: hidden;
`;

const Inner = styled(Chars)`
  float: right;
  overflow: hidden;
`;

export const TypedChars: React.FunctionComponent<{
  value: string;
}> = ({ value }) => (
  <Outer>
    <Inner className={Classes.TEXT_DISABLED}>{value}</Inner>
  </Outer>
);
