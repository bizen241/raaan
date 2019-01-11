import { styled } from "../../style";
import { fontSizes, paddings, Size } from "./values";

export const Summary = styled.summary<{
  size?: Size;
}>`
  padding: ${p => paddings[p.size || "medium"]};
  color: ${p => p.theme.text};
  font-family: inherit;
  font-size: ${p => fontSizes[p.size || "medium"]};
`;
