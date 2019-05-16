import { Button, Classes, Navbar, NavbarGroup } from "@blueprintjs/core";
import { goBack } from "connected-react-router";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { styled } from "../../style";
import { Column, Row } from "../ui";

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

export const Page = connector(
  state => ({
    pathname: state.router.location.pathname
  }),
  () => ({
    back: goBack
  }),
  ({ pathname, back, children }) => {
    const isHome = pathname === "/";
    const isConfig = pathname === "/config";

    return (
      <Outer>
        <Navbar style={{ display: "flex", justifyContent: "center", padding: 0 }}>
          <NavbarGroup align="center" style={{ width: "100%", maxWidth: "1000px" }}>
            <Row padding="around">
              <Button icon="arrow-left" onClick={back} />
            </Row>
            <Row padding="around" center="both" flex={1}>
              {isHome ? (
                <span className={`${Classes.TEXT_LARGE} ${Classes.TEXT_DISABLED}`}>Raan</span>
              ) : (
                <Link className={`${Classes.TEXT_LARGE}`} to="/">
                  Raan
                </Link>
              )}
            </Row>
            <Row padding="around">
              {isConfig ? (
                <Button icon="cog" disabled />
              ) : (
                <Link className={`${Classes.BUTTON} ${Classes.iconClass("cog")}`} to="/config" />
              )}
            </Row>
          </NavbarGroup>
        </Navbar>
        <Column padding="around" style={{ width: "100%", maxWidth: "1000px" }}>
          {children}
        </Column>
      </Outer>
    );
  }
);
