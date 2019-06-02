import * as React from "react";
import { styled } from "../../style";
import { Header } from "../project/Header";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;

  &.page-enter {
    opacity: 0;
  }

  &.page-enter-active {
    transition: opacity 100ms ease-out;
    opacity: 1;
  }

  &.page-exit {
    transition: opacity 100ms ease-out;
    opacity: 1;
  }

  &.page-exit-active {
    opacity: 0;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  padding: 8px;
`;

export const Page: React.FunctionComponent = ({ children }) => {
  return (
    <Outer>
      <Header />
      <Inner>{children}</Inner>
    </Outer>
  );
};
