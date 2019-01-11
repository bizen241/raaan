import { styled } from "../../style";

export const Details = styled.details`
  background-color: ${p => p.theme.container};
  border-style: solid;
  border-width: 1px;
  border-color: ${p => p.theme.border};
  border-radius: 2px;
`;
