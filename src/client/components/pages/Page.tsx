import * as React from "react";
import { styled } from "../../style";
import { Column } from "../ui";

const Outer = styled(Column)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;

  &.page-enter {
    opacity: 0;
  }

  &.page-enter-active {
    transition: opacity 200ms ease-in;
    opacity: 1;
  }

  &.page-exit {
    transition: opacity 200ms ease-in;
    opacity: 1;
  }

  &.page-exit-active {
    opacity: 0;
  }
`;

export const Page: React.FunctionComponent = ({ children }) => {
  return (
    <Outer>
      <Column style={{ width: "100%", maxWidth: "1000px" }}>{children}</Column>
    </Outer>
  );
};
