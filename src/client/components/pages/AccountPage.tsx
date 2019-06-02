import { Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connector } from "../../reducers";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { iconStyles } from "../ui/styles";
import { Page } from "./Page";

const AccountPage = connector(
  () => ({}),
  () => ({}),
  () => {
    const currentUser = useContext(UserContext);
    const isGuest = currentUser.permission === "Guest";

    const iconClasses = iconStyles();

    return (
      <Page>
        {isGuest ? (
          <Button variant="contained" size="large" component={RouterLink} to="/login">
            <AccountCircle className={iconClasses.leftIcon} />
            <Message id="login" />
          </Button>
        ) : (
          <Button variant="contained" size="large" component={RouterLink} to="/login">
            <AccountCircle className={iconClasses.leftIcon} />
            <Message id="logout" />
          </Button>
        )}
      </Page>
    );
  }
);

export default AccountPage;
