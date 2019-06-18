import { Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../project/Context";
import { Message } from "../project/Message";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

const AccountPage = React.memo(() => {
  const currentUser = useContext(UserContext);
  const isGuest = currentUser.permission === "Guest";

  const classes = useStyles();

  return (
    <Page>
      {isGuest ? (
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/login">
          <AccountCircle className={classes.leftIcon} />
          <Message id="login" />
        </Button>
      ) : (
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/logout">
          <AccountCircle className={classes.leftIcon} />
          <Message id="logout" />
        </Button>
      )}
    </Page>
  );
});

export default AccountPage;
