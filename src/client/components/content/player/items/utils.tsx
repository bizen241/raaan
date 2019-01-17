import { keyframes, styled } from "../../../../style";
import { Chars, Row } from "../../../ui";

export const TypedChars = styled(Chars)`
  max-width: 50%;
  direction: rtl;
  opacity: 0.5;
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

export const TypoKey = styled(Chars)`
  background-color: ${p => p.theme.container};
  animation: ${scale} 100ms ease-out;
`;

export const UntypedCharsWrapper = styled(Row)`
  overflow: hidden;
`;
