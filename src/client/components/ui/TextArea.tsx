import TextAreaAutosize from "react-textarea-autosize";
import { styled } from "../../style";
import { fontSizes, Size } from "./values";

export const TextArea = styled(TextAreaAutosize)<{
  size?: Size;
}>`
  padding-top: 0.25em;
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
  line-height: 1.5em;
  text-decoration: none;
  resize: none;

  :hover,
  :focus {
    border-bottom-color: ${p => p.theme.focus};
    outline: none;
  }
`;
