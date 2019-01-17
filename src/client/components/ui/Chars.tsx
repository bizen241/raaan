import { styled } from "../../style";
import { fontSizes, Size } from "./values";

export const Chars = styled.span<{
  size?: Size;
}>`
  flex-shrink: 0;
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};
  font-weight: normal;
  text-decoration: none;
  word-break: keep-all;
  overflow: hidden;
`;
