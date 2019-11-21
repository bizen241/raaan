import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle, ArrowBack, Home, Info, Mail, Settings } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../reducers";
import { Column, Menu } from "../ui";
import { useStyles } from "../ui/styles";
import { Message } from "./Message";

export const Header = React.memo<{ title?: React.ReactNode }>(({ title = "" }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pathname } = useSelector((state: RootState) => ({
    pathname: state.router.location.pathname
  }));

  return (
    <AppBar position="static" color="default">
      <Column alignItems="center">
        <Column width="100%" maxWidth="1000px" px={1}>
          <Toolbar variant="dense" disableGutters>
            <IconButton onClick={useCallback(() => dispatch(goBack()), [])}>
              <ArrowBack />
            </IconButton>
            <Typography component="span">{title}</Typography>
            <Box flex={1} />
            <Menu>
              <MenuItem disabled={pathname === "/user/user-config"} component={Link} to="/user/user-config">
                <Settings className={classes.leftIcon} />
                <Typography>
                  <Message id="settings" />
                </Typography>
              </MenuItem>
              <MenuItem disabled={pathname === "/"} component={Link} to="/">
                <Home className={classes.leftIcon} />
                <Typography>ホーム</Typography>
              </MenuItem>
              <MenuItem disabled={pathname === "/user/user-messages"} component={Link} to="/user/user-messages">
                <Mail className={classes.leftIcon} />
                <Typography>通知</Typography>
              </MenuItem>
              <MenuItem disabled={pathname === "/user"} component={Link} to="/user">
                <AccountCircle className={classes.leftIcon} />
                <Typography>
                  <Message id="account" />
                </Typography>
              </MenuItem>
              <MenuItem disabled={pathname === "/app"} component={Link} to="/app">
                <Info className={classes.leftIcon} />
                アプリについて
              </MenuItem>
            </Menu>
          </Toolbar>
        </Column>
      </Column>
    </AppBar>
  );
});
