import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { ArrowBack, Settings } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { Row } from "../ui";

export const Header = connector(
  state => ({
    pathname: state.router.location.pathname
  }),
  () => ({
    back: goBack
  }),
  ({ pathname, back }) => {
    const isConfig = pathname === "/config";

    return (
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Row>
            <IconButton onClick={back}>
              <ArrowBack />
            </IconButton>
          </Row>
          <Row flex={1} />
          <Row>
            {!isConfig ? (
              <IconButton component={Link} to="/config">
                <Settings />
              </IconButton>
            ) : null}
          </Row>
        </Toolbar>
      </AppBar>
    );
  }
);
