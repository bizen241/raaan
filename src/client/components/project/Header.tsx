import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ArrowBack, Home, Mail, Person, Settings, Web } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEntity } from "../../hooks/useEntity";
import { RootState } from "../../reducers";
import { Column, Menu, MenuItem } from "../ui";
import { UserContext } from "./Context";

export const Header = React.memo<{ title?: React.ReactNode }>(({ title = "" }) => {
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const { entity: currentUserSummary } = useEntity("UserSummary", currentUser.summaryId);

  const { pathname } = useSelector((state: RootState) => ({
    pathname: state.router.location.pathname
  }));

  return (
    <AppBar position="static" color="default">
      <Column alignItems="center">
        <Column width="100%" maxWidth="1000px" px={1}>
          <Toolbar variant="dense" disableGutters>
            <IconButton onClick={useCallback(() => dispatch(goBack()), [])} style={{ padding: "16px" }}>
              <ArrowBack />
            </IconButton>
            <Typography component="span">{title}</Typography>
            <Box flex={1} />
            <Menu
              icon={
                currentUserSummary && currentUserSummary.emailHash ? (
                  <Avatar src={`https://www.gravatar.com/avatar/${currentUserSummary.emailHash}?d=identicon`} />
                ) : (
                  <Person />
                )
              }
            >
              <MenuItem icon={<Home />} label="ホーム" disabled={pathname === "/"} to="/" />
              <MenuItem
                icon={<Mail />}
                label="通知"
                disabled={pathname === "/user/notifications/messages"}
                to="/user/notifications/messages"
              />
              <MenuItem icon={<Web />} label="アプリ" disabled={pathname === "/app"} to="/app" />
              <MenuItem
                icon={<Person />}
                label="アカウント"
                disabled={pathname === "/user/account"}
                to="/user/account"
              />
              <MenuItem icon={<Settings />} label="設定" disabled={pathname === "/user/config"} to="/user/config" />
            </Menu>
          </Toolbar>
        </Column>
      </Column>
    </AppBar>
  );
});
