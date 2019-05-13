import { Button, ButtonGroup, Classes, Navbar, NavbarGroup } from "@blueprintjs/core";
import { goBack, goForward } from "connected-react-router";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Row } from "../ui";

export const Header = connector(
  (state, ownProps: { heading: string }) => ({
    heading: ownProps.heading,
    pathname: state.router.location.pathname
  }),
  () => ({
    back: goBack,
    forward: goForward
  }),
  ({ heading, pathname, back, forward }) => {
    const isHome = pathname === "/";

    return (
      <Navbar>
        <NavbarGroup align="center">
          <Row padding="around">
            <ButtonGroup>
              <Button icon="arrow-left" onClick={back} />
              <Button icon="arrow-right" onClick={forward} />
            </ButtonGroup>
          </Row>
          <Row padding flex={1}>
            <div className={Classes.TEXT_OVERFLOW_ELLIPSIS}>{heading}</div>
          </Row>
          <Row padding="around">
            {isHome ? (
              <Button icon="home" disabled />
            ) : (
              <Link className={`${Classes.BUTTON} ${Classes.iconClass("home")}`} to="/" />
            )}
          </Row>
        </NavbarGroup>
      </Navbar>
    );
  }
);
