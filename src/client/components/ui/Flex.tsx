import { styled } from "../../style";
import { Size, sizes } from "./values";

const Flex = styled.div<{
  center?: "main" | "cross" | "both";
  flex?: number;
  padding?: Size;
}>`
  display: flex;
  align-items: ${p => (p.center === "cross" || p.center === "both" ? "center" : "unset")};
  justify-content: ${p => (p.center === "main" || p.center === "both" ? "center" : "unset")};
  flex: ${p => p.flex || "unset"};
  padding: ${p => p.padding && sizes[p.padding]};
`;

export const Row = styled(Flex)`
  flex-direction: row;
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;
