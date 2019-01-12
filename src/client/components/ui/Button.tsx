import { styled } from "../../style";
import { fontSizes, paddings, Size } from "./values";

export const Button = styled.button<{
  size?: Size;
  to?: string;
  href?: string;
  displayAccessKey?: boolean;
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

  ::after {
    visibility: ${p => (p.accessKey && p.displayAccessKey ? "visible" : "collapse")};
    content: attr(accessKey);
    height: 1.5em;
    margin-left: 0.5em;
    padding: 0 0.25em;
    border-style: solid;
    border-width: 1px;
    border-color: ${p => p.theme.border};
    border-radius: 2px;
    font-size: ${fontSizes.small};
    text-align: center;
    vertical-align: center;
    line-height: 1.5em;
  }

  :focus,
  :hover {
    outline-style: dashed;
    outline-width: 1px;
    outline-color: ${p => p.theme.border};
    outline-offset: -2px;
  }
`;

Button.defaultProps = {
  displayAccessKey: true
};
