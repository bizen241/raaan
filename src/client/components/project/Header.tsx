import { goBack } from "connected-react-router";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { styled } from "../../style";
import { Column, FlatButton, Row } from "../ui";

const Outer = styled(Column)`
  width: 100%;
  border-bottom: solid 1px ${p => p.theme.main}33;
`;

const Inner = styled(Row)`
  width: 100%;
  max-width: 1000px;
`;

export const Header = connector(
  state => ({
    pathname: state.router.location.pathname
  }),
  () => ({
    back: goBack
  }),
  ({ pathname, back }) => {
    const isHome = pathname === "/";
    const isConfig = pathname === "/config";

    return (
      <Outer center="both">
        <Inner>
          <Row padding="around">
            <FlatButton onClick={back}>←</FlatButton>
          </Row>
          <Row padding="around" center="both" flex={1}>
            {isHome ? <span>Raan</span> : <Link to="/">Raan</Link>}
          </Row>
          <Row padding="around">
            {isConfig ? (
              <FlatButton>⚙️</FlatButton>
            ) : (
              <FlatButton as={Link} to="/config">
                ⚙️
              </FlatButton>
            )}
          </Row>
        </Inner>
      </Outer>
    );
  }
);
