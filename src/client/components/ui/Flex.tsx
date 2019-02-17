import { styled } from "../../style";
import { paddings, Size } from "./values";

const Flex = styled.div<{
  center?: "main" | "cross" | "both";
  flex?: number | string;
  padding?: Size;
  isResponsive?: boolean;
}>`
  display: flex;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  align-items: ${p => (p.center === "cross" || p.center === "both" ? "center" : "unset")};
  justify-content: ${p => (p.center === "main" || p.center === "both" ? "center" : "unset")};
  flex: ${p => p.flex || "initial"};
  padding: ${p => p.padding && paddings[p.padding]};
`;

export const Row = styled(Flex)`
  flex-direction: row;

  @media (orientation: portrait) {
    flex-direction: ${p => (p.isResponsive ? "column" : "row")};
  }
`;

export const Column = styled(Flex)`
  flex-direction: column;

  @media (orientation: portrait) {
    flex-direction: ${p => (p.isResponsive ? "row" : "column")};
  }
`;
