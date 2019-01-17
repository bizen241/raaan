import { styled } from "../../../../style";
import { Chars, Row } from "../../../ui";

export const TypedChars = styled(Chars)`
  max-width: 50%;
  direction: rtl;
  opacity: 0.5;
`;

export const UntypedCharsWrapper = styled(Row)`
  overflow: hidden;
`;
