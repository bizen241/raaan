import { Button, Typography } from "@material-ui/core";
import { AccountCircle, Edit, Search } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserDiaryGraph } from "../graphs/UserDiaryGraph";
import { UserContext } from "../project/Context";
import { Column, Page } from "../ui";
import { useStyles } from "../ui/styles";

export const HomePage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      {isGuest && (
        <Column pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/account"
          >
            <AccountCircle className={classes.leftIcon} />
            <Typography>ログイン</Typography>
          </Button>
        </Column>
      )}
      {!isGuest && (
        <Column pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="primary"
            component={RouterLink}
            to={`/users/${currentUser.id}`}
          >
            <AccountCircle className={classes.leftIcon} />
            <Typography>マイページ</Typography>
          </Button>
        </Column>
      )}
      <Column pb={1}>
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/contents">
          <Search className={classes.leftIcon} />
          <Typography>クイズを探す</Typography>
        </Button>
      </Column>
      <Column pb={1}>
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/exercises/edit">
          <Edit className={classes.leftIcon} />
          <Typography>クイズを作る</Typography>
        </Button>
      </Column>
      {!isGuest && (
        <Column pb={1}>
          <UserDiaryGraph />
        </Column>
      )}
    </Page>
  );
});
