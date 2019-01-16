import { styled } from "../../style";
import { fontSizes, paddings, Size } from "./values";

export const Summary = styled.summary<{
  size?: Size;
}>`
  display: flex;
  align-items: center;
  padding-left: ${p => paddings[p.size || "medium"]};
  background-color: ${p => p.theme.input};
  border-bottom-style: solid;
  border-width: 3px;
  border-color: ${p => p.theme.container};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};

  ::before {
    content: "▶";
    width: 1.5em;
    font-size: 0.8em;
  }

  ::-webkit-details-marker {
    display: none;
  }

  details[open] &::before {
    content: "▼";
  }

  :hover,
  :focus {
    border-color: ${p => p.theme.accent};
    outline: none;
  }
`;
