import { styled } from "../../style";

const Flex = styled.div<{
  center?: "main" | "cross" | "both";
  flex?: number | string;
  padding?: boolean;
  isResponsive?: boolean;
}>`
  display: flex;
  min-width: 0;
  min-height: 0;
  align-items: ${p => (p.center === "cross" || p.center === "both" ? "center" : "unset")};
  justify-content: ${p => (p.center === "main" || p.center === "both" ? "center" : "unset")};
  flex: ${p => p.flex || "initial"};
  padding: ${p => (p.padding ? "0.5rem" : "0")};
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
