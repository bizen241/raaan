import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle, ArrowBack, Home, Info, MoreVert, Settings } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";
import { iconStyles } from "../ui/styles";
import { Message } from "./Message";

export const Header = connector(
  (state, ownProps: { title?: React.ReactNode }) => ({
    ...ownProps,
    pathname: state.router.location.pathname
  }),
  () => ({
    back: goBack
  }),
  ({ title = "", pathname, back }) => {
    const [menuAnchorElement, setMenuAnchorElement] = React.useState(null);

    const iconClasses = iconStyles();

    return (
      <AppBar position="static" color="default">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" flexDirection="column" width="100%" maxWidth="1000px" px={1}>
            <Toolbar variant="dense" disableGutters>
              <IconButton onClick={back}>
                <ArrowBack />
              </IconButton>
              <Typography component="span">{title}</Typography>
              <Box flex={1} />
              <div>
                <IconButton onClick={React.useCallback(e => setMenuAnchorElement(e.currentTarget), [])}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={menuAnchorElement}
                  open={Boolean(menuAnchorElement)}
                  onClose={React.useCallback(() => setMenuAnchorElement(null), [])}
                >
                  {pathname !== "/config" ? (
                    <MenuItem component={Link} to="/config">
                      <Settings className={iconClasses.leftIcon} />
                      <Message id="settings" />
                    </MenuItem>
                  ) : null}
                  {pathname !== "/" ? (
                    <MenuItem component={Link} to="/">
                      <Home className={iconClasses.leftIcon} />
                      ホーム
                    </MenuItem>
                  ) : null}
                  {pathname !== "/account" ? (
                    <MenuItem component={Link} to="/account">
                      <AccountCircle className={iconClasses.leftIcon} />
                      <Message id="account" />
                    </MenuItem>
                  ) : null}
                  {pathname !== "/app" ? (
                    <MenuItem component={Link} to="/app">
                      <Info className={iconClasses.leftIcon} />
                      アプリについて
                    </MenuItem>
                  ) : null}
                </Menu>
              </div>
            </Toolbar>
          </Box>
        </Box>
      </AppBar>
    );
  }
);
