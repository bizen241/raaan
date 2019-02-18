import * as React from "react";
import { styled } from "../../../../../style";
import { Column } from "../../../../ui";
import { Chars } from "../chars/Chars";

const Outer = styled(Column)`
  overflow: hidden;
  flex: none;
`;

export const TypingKanjiLine: React.FunctionComponent<{
  value: string;
}> = ({ value }) => (
  <Outer>
    <Chars>{value}</Chars>
  </Outer>
);
