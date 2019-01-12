import { styled } from "../../style";
import { fontSizes, Size } from "./values";

export const Key = styled.kbd<{
  size?: Size;
}>`
  padding: 0 0.25em;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${p => p.theme.border};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "small"]};
`;
