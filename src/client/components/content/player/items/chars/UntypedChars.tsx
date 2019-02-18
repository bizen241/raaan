import * as React from "react";
import { styled } from "../../../../../style";
import { Row } from "../../../../ui";
import { Chars } from "./Chars";

const Outer = styled(Row)`
  overflow: hidden;
`;

export const UntypedChars: React.FunctionComponent<{
  value: string;
}> = ({ value }) => (
  <Outer>
    <Chars>{value}</Chars>
  </Outer>
);