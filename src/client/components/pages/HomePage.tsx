import { Box, Button, Typography } from "@material-ui/core";
import { AccountCircle, Edit, Keyboard } from "@material-ui/icons";
import { useContext } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserDiaryGraph } from "../graphs/UserDiaryGraph";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";
import { UserSummaryViewer } from "../viewer/UserSummaryViewer";
import { Page } from "./Page";

export const HomePage = React.memo(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="ホーム">
      {isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to="/account">
            <AccountCircle className={classes.leftIcon} />
            <Typography>ログイン</Typography>
          </Button>
        </Box>
      )}
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/exercises"
        >
          <Keyboard className={classes.leftIcon} />
          <Typography>クイズを探す</Typography>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/exercises/edit"
        >
          <Edit className={classes.leftIcon} />
          <Typography>クイズを作る</Typography>
        </Button>
      </Box>
      {!isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="secondary"
            component={RouterLink}
            to={`/users/${currentUser.id}`}
          >
            <AccountCircle className={classes.leftIcon} />
            <Typography>マイページ</Typography>
          </Button>
        </Box>
      )}
      {!isGuest && (
        <Box pb={1}>
          <UserSummaryViewer entityId={currentUser.summaryId} />
        </Box>
      )}
      {!isGuest && (
        <Box pb={1}>
          <UserDiaryGraph />
        </Box>
      )}
    </Page>
  );
});
