import { styled } from "../../style";
import { fontSizes, heights, Size } from "./values";

export const Input = styled.input<{
  size?: Size;
}>`
  height: ${p => heights[p.size || "medium"]};
  padding-left: 0.5em;
  border-style: solid;
  border-width: 1px;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  border-color: ${p => p.theme.border};
  border-radius: 2px;
  background-color: ${p => p.theme.input};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};
  text-decoration: none;

  :hover,
  :focus {
    border-bottom-color: ${p => p.theme.accent};
  }
`;
