import { Box, Button } from "@material-ui/core";
import { Folder, History } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummaryList } from "../list/search/ExerciseSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { useStyles } from "../ui/styles";
import { Page } from "./Page";

export const ExercisesPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  const classes = useStyles();

  return (
    <Page title="遊ぶ">
      <Box display="flex" flexDirection="column" pb={1}>
        <Button
          className={classes.largeButton}
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/users/${currentUser.id}/exercises`}
        >
          <Folder className={classes.leftIcon} />
          自分の問題集
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" component={RouterLink} to={`/exercises/history`}>
          <History className={classes.leftIcon} />
          提出履歴
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" pb={1}>
        <ExerciseSummaryList title="検索結果" searchParams={{}} />
      </Box>
    </Page>
  );
});
