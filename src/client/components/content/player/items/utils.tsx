import { keyframes, styled } from "../../../../style";

export const TypingChars = styled.span<{
  small?: boolean;
}>`
  font-size: ${p => (p.small ? "3vmax" : "4vmax")};
  line-height: 1.5em;
`;

export const TypedCharsWrapper = styled.div`
  flex-shrink: 0;
  max-width: 50%;
  overflow: hidden;
`;

export const TypedChars = styled(TypingChars)`
  float: right;
  white-space: pre;
  overflow: hidden;
`;

export const UntypedCharsWrapper = styled.div`
  overflow: hidden;
`;

export const UntypedChars = styled(TypingChars)`
  white-space: pre;
  overflow: hidden;
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

export const TypoKey = styled(TypingChars)`
  animation: ${scale} 100ms ease-out;
`;

export const NextKey = TypingChars;
