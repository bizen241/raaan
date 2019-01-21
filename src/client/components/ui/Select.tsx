import { styled } from "../../style";

export const Select = styled.select`
  :-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 ${p => p.theme.text};
  }

  :hover,
  :focus {
    border-bottom-color: ${p => p.theme.focus};
    outline: none;
  }
`;
