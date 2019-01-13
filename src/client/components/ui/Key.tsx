import { styled } from "../../style";

export const Key = styled.kbd`
  height: 1.5em;
  padding: 0 0.25em;
  margin-left: 0.5em;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  border-color: ${p => p.theme.border};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: 0.8em;
  line-height: 1.5em;
`;
