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
          <Button icon="arrow-left" disabled={!canBack} onClick={back} />
          <Row padding="medium" flex={1}>
            <div className={Classes.TEXT_OVERFLOW_ELLIPSIS}>{heading}</div>
          </Row>
        </NavbarGroup>
      </Navbar>
    );
  }
);
