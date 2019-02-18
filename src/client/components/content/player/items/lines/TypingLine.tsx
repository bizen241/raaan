import * as React from "react";
import { keyframes, styled } from "../../../../../style";
import { Row } from "../../../../ui";
import { Chars } from "../chars/Chars";
import { TypedChars } from "../chars/TypedChars";
import { UntypedChars } from "../chars/UntypedChars";

const Outer = styled(Row)`
  overflow: hidden;
  flex: none;
`;

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
`;

const TypoKey = styled(Chars)`
  animation: ${scale} 100ms ease-out;
`;

export const TypingLine: React.FunctionComponent<{
  untypedString: string;
  typedString: string;
  hasTypo: boolean;
}> = ({ untypedString, typedString, hasTypo }) => {
  const nextKey = untypedString[0];

  return (
    <Outer>
      <TypedChars value={typedString} />
      {hasTypo ? <TypoKey key={performance.now()}>{nextKey}</TypoKey> : <Chars>{nextKey}</Chars>}
      <UntypedChars value={untypedString.slice(1)} />
    </Outer>
  );
};
