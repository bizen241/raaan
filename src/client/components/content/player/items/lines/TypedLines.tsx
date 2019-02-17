import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { styled } from "../../../../../style";
import { Column } from "../../../../ui";
import { Chars } from "../chars/Chars";

const Outer = styled(Column)`
  min-height: 50%;
  position: relative;
`;

const Inner = styled(Column)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const TypedLines: React.FunctionComponent<{
  value: string;
}> = ({ value: typedLines }) => {
  return (
    <Outer>
      <Inner flex={1}>
        <Column flex={1} />
        <Chars className={Classes.TEXT_DISABLED}>{typedLines}</Chars>
      </Inner>
    </Outer>
  );
};
