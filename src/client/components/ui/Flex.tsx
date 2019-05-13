import { styled } from "../../style";

const Flex = styled.div<{
  center?: "main" | "cross" | "both";
  flex?: number | string;
  padding?: "around" | "vertical" | "horizontal";
  isResponsive?: boolean;
}>`
  display: flex;
  min-width: 0;
  min-height: 0;
  align-items: ${p => (p.center === "cross" || p.center === "both" ? "center" : "unset")};
  justify-content: ${p => (p.center === "main" || p.center === "both" ? "center" : "unset")};
  flex: ${p => p.flex || "initial"};
  padding-top: ${p => (p.padding === "around" || p.padding === "vertical" ? "0.5rem" : "0")};
  padding-bottom: ${p => (p.padding === "around" || p.padding === "vertical" ? "0.5rem" : "0")};
  padding-right: ${p => (p.padding === "around" || p.padding === "horizontal" ? "0.5rem" : "0")};
  padding-left: ${p => (p.padding === "around" || p.padding === "horizontal" ? "0.5rem" : "0")};
  border: solid 1px red;
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
