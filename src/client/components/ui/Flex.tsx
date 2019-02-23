import { styled } from "../../style";

type Size = "large" | "medium" | "small";

const paddings: { [P in Size]: string } = {
  large: "0.75rem",
  medium: "0.5rem",
  small: "0.25rem"
};

const Flex = styled.div<{
  center?: "main" | "cross" | "both";
  flex?: number | string;
  padding?: Size;
  isResponsive?: boolean;
}>`
  display: flex;
  min-width: 0;
  min-height: 0;
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
