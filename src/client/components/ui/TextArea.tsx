import { styled } from "../../style";
import { fontSizes, heights, Size } from "./values";

export const TextArea = styled.textarea<{
  size?: Size;
}>`
  padding-left: 0.5rem;
  border-style: solid;
  border-width: 1px;
  border-bottom-style: double;
  border-bottom-width: 3px;
  border-color: ${p => p.theme.border};
  border-radius: 2px;
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};
  text-decoration: none;

  :focus {
    border-bottom-style: solid;
  }
`;
