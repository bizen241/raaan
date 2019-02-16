import { Button, Classes, Navbar, NavbarGroup } from "@blueprintjs/core";
import { goBack } from "connected-react-router";
import * as React from "react";
import { connector } from "../../reducers";
import { Row } from "../ui";

export const Header = connector(
  (state, ownProps: { heading: string }) => ({
    heading: ownProps.heading,
    canBack: state.router.location.pathname !== "/"
  }),
  () => ({
    back: goBack
  }),
  ({ heading, canBack, back }) => {
    return (
      <Navbar>
        <NavbarGroup align="center">
          <Row>{canBack ? <Button icon="arrow-left" onClick={back} /> : null}</Row>
          <Row padding="medium" flex={1}>
            <div className={Classes.TEXT_OVERFLOW_ELLIPSIS}>{heading}</div>
          </Row>
        </NavbarGroup>
      </Navbar>
    );
  }
);
