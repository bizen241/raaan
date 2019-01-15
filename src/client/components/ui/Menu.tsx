import { styled } from "../../style";
import { Column } from "./Flex";

export const Menu = styled(Column)`
  position: absolute;
  top: 100%;
  right: -1px;
  background-color: ${p => p.theme.input};
  border-style: solid;
  border-width: 1px;
  border-color: ${p => p.theme.border};
  z-index: 1;
`;
