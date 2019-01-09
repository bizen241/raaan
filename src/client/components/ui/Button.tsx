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
  border-style: double;
  border-width: 3px;
  border-color: ${p => p.theme.border};
  border-radius: 2px;
  background-color: ${p => p.theme.background};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};
  text-decoration: none;

  ::-moz-focus-inner {
    padding: 0;
    border: none;
  }

  :hover {
    border-style: double;
    border-right-style: solid;
    border-bottom-style: solid;
  }

  :active {
    border-style: double;
    border-top-style: solid;
    border-left-style: solid;
  }

  :focus {
    outline-style: dashed;
    outline-width: 1px;
    outline-color: ${p => p.theme.border};
    outline-offset: -5px;
  }
`;
