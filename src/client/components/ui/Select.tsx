import { styled } from "../../style";
import { fontSizes, paddings } from "./values";

export const Select = styled.select`
  height: 100%;
  padding: ${() => paddings.medium} 1rem;
  background-color: ${p => p.theme.input};
  border-style: solid;
  border-width: 1px;
  border-bottom-width: 3px;
  border-radius: 2px;
  border-color: ${p => p.theme.border};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${() => fontSizes.medium};
  line-height: 1.5em;

  :-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${p => p.theme.text};
  }

  :hover,
  :focus {
    border-bottom-color: ${p => p.theme.accent};
    outline: none;
  }
`;
