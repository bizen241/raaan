import { Alignment, Button, Classes, Navbar, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import { Trans } from "@lingui/react";
import { goBack } from "connected-react-router";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Row } from "../ui";

export const Header = connector(
  (state, ownProps: { heading: string }) => ({
    heading: ownProps.heading,
    isLoggedIn: state.app.user.permission !== "Guest",
    canBack: state.router.location.pathname !== "/"
  }),
  () => ({
    back: goBack
  }),
  ({ heading, isLoggedIn, canBack, back }) => {
    return (
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          {canBack ? <Button icon="arrow-left" onClick={back} /> : null}
          <Row padding="medium">
            <NavbarHeading>{heading}</NavbarHeading>
          </Row>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          {!isLoggedIn ? (
            <Row padding="medium">
              <Link className={`${Classes.BUTTON} ${Classes.iconClass("key")}`} to="/login">
                <Trans>ログイン</Trans>
              </Link>
            </Row>
          ) : null}
          <Link className={`${Classes.BUTTON} ${Classes.iconClass("cog")}`} to="/config">
            設定
          </Link>
        </NavbarGroup>
      </Navbar>
    );
  }
);
