import { styled } from "../../style";

export const DottedSeparator = styled.div`
  border-bottom-style: dotted;
  border-bottom-color: ${p => p.theme.accent};
  border-bottom-width: 1px;
`;

export const DoubleSeparator = styled.div`
  border-bottom-style: double;
  border-bottom-color: ${p => p.theme.accent};
  border-bottom-width: 3px;
`;
