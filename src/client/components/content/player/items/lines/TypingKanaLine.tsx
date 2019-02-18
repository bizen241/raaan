import * as React from "react";
import { styled } from "../../../../../style";
import { Row } from "../../../../ui";
import { TypedChars } from "../chars/TypedChars";
import { UntypedChars } from "../chars/UntypedChars";

const Outer = styled(Row)`
  overflow: hidden;
  flex: none;
`;

export const TypingKanaLine: React.FunctionComponent<{
  untypedKana: string;
  typedKana: string;
}> = ({ untypedKana, typedKana }) => (
  <Outer>
    <TypedChars value={typedKana} />
    <UntypedChars value={untypedKana} />
  </Outer>
);
