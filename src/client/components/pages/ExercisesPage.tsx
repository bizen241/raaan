import { Box, Button, Typography } from "@material-ui/core";
import { History, Person, PlaylistPlay } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummaryList } from "../list/search/ExerciseSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

export const ExercisesPage = React.memo<PageProps>(() => {
  const classes = useStyles();
  const currentUser = useContext(UserContext);

  const isGuest = currentUser.permission === "Guest";

  return (
    <Page title="遊ぶ">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/playlists`}
        >
          <PlaylistPlay className={classes.leftIcon} />
          <Typography>プレイリスト</Typography>
        </Button>
      </Box>
      {!isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            component={RouterLink}
            to={`/users/${currentUser.id}/exercises`}
          >
            <Person className={classes.leftIcon} />
            <Typography>自分の問題集</Typography>
          </Button>
        </Box>
      )}
      {!isGuest && (
        <Box display="flex" flexDirection="column" pb={1}>
          <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
            <History className={classes.leftIcon} />
            <Typography>提出履歴</Typography>
          </Button>
        </Box>
      )}
      <Box display="flex" flexDirection="column" pb={1}>
        <ExerciseSummaryList />
      </Box>
    </Page>
  );
});
