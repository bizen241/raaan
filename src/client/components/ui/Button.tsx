import { styled } from "../../style";
import { fontSizes, paddings, Size } from "./values";

export const Button = styled.button<{
  size?: Size;
  to?: string;
  href?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${p => paddings[p.size || "medium"]} 1rem;
  border-style: solid;
  border-width: 1px;
  border-color: ${p => p.theme.border};
  border-radius: 2px;
  background-color: ${p => p.theme.input};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};
  text-decoration: none;

  ::-moz-focus-inner {
    padding: 0;
    border: none;
  }

  :focus,
  :hover {
    outline-style: dashed;
    outline-width: 1px;
    outline-color: ${p => p.theme.border};
    outline-offset: -2px;
  }
`;
